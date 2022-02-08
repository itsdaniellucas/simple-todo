import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import constants from '@app/shared/constants';
import { QueueService } from '@app/shared/modules/queue/queue.service'
import { CacheService } from '@app/shared/modules/cache/cache.service';
import { TodoValidator } from './todo.validator';
import { Todo } from '@app/shared/models/database/todo.entity';
import { TodoList } from '@app/shared/models/database/todolist.entity';
import { TodoStats } from '@app/shared/models/database/todostats.entity';
import { User } from '@app/shared/models/database/user.entity';
import { TodoInput } from '@app/shared/models/input/TodoInput';
import { TodoListInput } from '@app/shared/models/input/TodoListInput';
import { TodoListOutput } from '@app/shared/models/output/TodoListOutput';
import { TodoOutput } from '@app/shared/models/output/TodoOutput';
import { TodoStatsOutput } from '@app/shared/models/output/TodoStatsOutput';

@Injectable()
export class TodoService {
    constructor(@Inject(constants.todoRepository) private todoRepository: typeof Todo,
                @Inject(constants.todoListRepository) private todoListRepository: typeof TodoList,
                @Inject(constants.todoStatsRepository) private todoStatsRepository: typeof TodoStats,
                private todoValidator: TodoValidator,
                private cacheService: CacheService,
                private queueService: QueueService) {}

    async getTodos(todoListId: number, user: User): Promise<TodoOutput[]> {
        return this.cacheService.getOrFetch<TodoOutput[]>(`todo_[todoListId:${todoListId}]`, async () => {
            const query = {
                attributes: ['id', 'title', 'done'],
                where: {
                    todoListId: todoListId,
                },
                include: {
                    model: TodoList,
                    where: {
                        userId: user.id
                    },
                    attributes: [],
                },
                order: [Sequelize.literal('"Todo"."createdAt" ASC')]
            };

            const todos = (await this.todoRepository.findAll(query)).map(i => new TodoOutput(i))
            await this.cacheService.set(`todo_[todoListId:${todoListId}]`, todos);
            return todos;
        });
    }

    async getTodoLists(user: User): Promise<TodoListOutput[]> {
        return this.cacheService.getOrFetch<TodoListOutput[]>(`todoList_[userId:${user.id}]`, async () => {
            const query = {
                attributes: ['id', 'title'],
                where: {
                    userId: user.id
                },
                order: [Sequelize.literal('"createdAt" ASC')]
            }

            const todoLists = (await this.todoListRepository.findAll(query)).map(i => new TodoListOutput(i));
            await this.cacheService.set(`todoList_[userId:${user.id}]`, todoLists);
            return todoLists;
        });
    }

    async getTodoStats(user: User): Promise<TodoStatsOutput[]> {
        return this.cacheService.getOrFetch<TodoStatsOutput[]>(`todoStats_[userId:${user.id}]`, async () => {
            const todoLists = await this.getTodoLists(user);
            const todoListIds = todoLists.map(i => i.id);

            const query = {
                attributes: ['id', 'done', 'total', 'todoListId', 'todoList.title'],
                where: {
                    todoListId: {
                        [Op.in]: todoListIds
                    }
                },
                include: {
                    model: TodoList,
                    attributes: [],
                },
                raw: true,
                order: [Sequelize.literal('"TodoStats"."createdAt" ASC')]
            };

            const todoStats = (await this.todoStatsRepository.findAll(query)).map(i => new TodoStatsOutput(i));
            this.cacheService.set(`todoStats_[userId:${user.id}]`, todoStats);
            return todoStats;
        });
    }

    async createTodo(todo: TodoInput, todoListId: number, user: User) {
        await this.todoValidator.createTodo(todoListId, user);

        const todoModel: Partial<Todo> = {
            title: todo.title,
            done: false,
            todoListId: todoListId,
        }

        const record = await this.todoRepository.create(todoModel);
        await this.cacheService.del(`todo_[todoListId:${todoListId}]`);
        await this.queueService.emit(constants.computeStats, {
            todoListId: todoListId,
            userId: user.id
        });
        return record;
    }

    async createTodoList(todoList: TodoListInput, user: User) {
        const todoListModel: Partial<TodoList> = {
            title: todoList.title,
            userId: user.id
        }

        const record = await this.todoListRepository.create(todoListModel);
        await this.cacheService.del(`todoList_[userId:${user.id}]`);
        await this.queueService.emit(constants.computeStats, {
            todoListId: record.id,
            userId: user.id
        });
        return record;
    }

    async changeTodoStatus(todoId: number, done: boolean, user: User) {
        const todoFound = await this.todoValidator.changeTodoStatus(todoId, user);

        const modelChanges: Partial<Todo> = {
            done: done,
        }

        const updateQuery = {
            where: {
                id: todoId,
            },
            returning: true,
        }

        const update = await this.todoRepository.update(modelChanges, updateQuery);
        const record = update[1][0];
        await this.cacheService.del(`todo_[todoListId:${todoFound.todoListId}]`);
        await this.queueService.emit(constants.computeStats, {
            todoListId: todoFound.todoListId,
            userId: user.id
        });
        return record;
    }

    async deleteTodo(todoId: number, user: User) {
        const todoFound = await this.todoValidator.deleteTodo(todoId, user);

        const query = {
            where: {
                id: todoId
            }
        }

        const deleteOp = await this.todoRepository.destroy(query);
        await this.cacheService.del(`todo_[todoListId:${todoFound.todoListId}]`);
        await this.queueService.emit(constants.computeStats, {
            todoListId: todoFound.todoListId,
            userId: user.id
        });
        return deleteOp;
    }

    async deleteTodoList(todoListId: number, user: User) {
        await this.todoValidator.deleteTodoList(todoListId, user);

        const trans = await this.todoRepository.sequelize.transaction();
        
        try {
            const deleteOp1 = await this.todoRepository.destroy({
                where: {
                    todoListId: todoListId
                },
                transaction: trans
            })

            const deleteOp2 = await this.todoListRepository.destroy({
                where: {
                    id: todoListId
                },
                transaction: trans
            })

            await trans.commit();

            await this.cacheService.del(`todoList_[userId:${user.id}]`);
            await this.queueService.emit(constants.computeStats, {
                todoListId: todoListId,
                userId: user.id
            });

            return deleteOp1 + deleteOp2;
        } catch {
            await trans.rollback();
            return 0;
        }
    }


}
