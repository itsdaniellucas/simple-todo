import { CacheService } from '@app/shared/modules/cache/cache.service';
import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import constants from '@app/shared/constants';
import { Todo } from '@app/shared/models/database/todo.entity';
import { TodoList } from '@app/shared/models/database/todolist.entity';
import { TodoStats } from '@app/shared/models/database/todostats.entity';
import { TodoListOutput } from '@app/shared/models/output/TodoListOutput';
import { TodoStatsOutput } from '@app/shared/models/output/TodoStatsOutput';

@Injectable()
export class KafkaService {
    constructor (@Inject(constants.todoRepository) private todoRepository: typeof Todo,
                @Inject(constants.todoListRepository) private todoListRepository: typeof TodoList,
                @Inject(constants.todoStatsRepository) private todoStatsRepository: typeof TodoStats,
                private cacheService: CacheService) {}

    async computeTodoStats(todoListId: number, userId: number) {
        const todoList = await this.todoListRepository.findOne({
            where: {
                id: todoListId
            }
        })

        if(!todoList) {
            await this.cacheService.del(`todoStats_[userId:${userId}]`);
            return;
        }

        const doneCount = await this.todoRepository.count({
            where: {
                todoListId: todoListId,
                done: true,
            }
        })

        const totalCount = await this.todoRepository.count({
            where: {
                todoListId: todoListId,
            }
        })

        let stats: Partial<TodoStats> = {
            todoListId: todoListId,
            done: doneCount,
            total: totalCount,
        }

        let todoStatsFound = await this.todoStatsRepository.findOne({
            where: {
                todoListId: todoListId
            }
        })

        if(todoStatsFound) {
            await this.todoStatsRepository.update(stats, {
                where: {
                    id: todoStatsFound.id,
                }
            })
        } else {
            todoStatsFound = await this.todoStatsRepository.create(stats);
        }

        const todoStats = await this.getTodoStats(userId);
        await this.cacheService.set(`todoStats_[userId:${userId}]`, todoStats);
    }


    async getTodoLists(userId: number): Promise<TodoListOutput[]> {
        return this.cacheService.getOrFetch<TodoListOutput[]>(`todoList_[userId:${userId}]`, async () => {
            const query = {
                attributes: ['id', 'title'],
                where: {
                    userId: userId
                },
                order: [Sequelize.literal('"createdAt" ASC')]
            }

            const todoLists = (await this.todoListRepository.findAll(query)).map(i => new TodoListOutput(i));
            await this.cacheService.set(`todoList_[userId:${userId}]`, todoLists);
            return todoLists;
        });
    }

    async getTodoStats(userId: number): Promise<TodoStatsOutput[]> {
        const todoLists = await this.getTodoLists(userId);
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

        return (await this.todoStatsRepository.findAll(query)).map(i => new TodoStatsOutput(i));
    }
}
