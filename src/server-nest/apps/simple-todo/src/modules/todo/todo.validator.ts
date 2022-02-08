import { Injectable, Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import constants from '@app/shared/constants'
import { TodoList } from '@app/shared/models/database/todolist.entity';
import { Todo } from '@app/shared/models/database/todo.entity';
import { User } from '@app/shared/models/database/user.entity';

@Injectable()
export class TodoValidator {
    constructor(@Inject(constants.todoRepository) private todoRepository: typeof Todo,
                @Inject(constants.todoListRepository) private todoListRepository: typeof TodoList) {
    }



    async createTodo(todoListId: number, user: User) {
        const query = {
            where: {
                id: todoListId
            }
        }

        const todoList = await this.todoListRepository.findOne(query);

        if(!todoList)
            throw new NotFoundException();

        if(todoList && todoList.userId != user.id)
            throw new ForbiddenException();
    }

    async changeTodoStatus(todoId: number, user: User) {
        const query = {
            where: {
                id: todoId,
            },
            include: {
                model: TodoList,
                where: {
                    userId: user.id
                }
            }
        };
        
        const todo = await this.todoRepository.findOne(query);
        
        if(!todo)
            throw new ForbiddenException();

        return todo;
    }

    async deleteTodo(todoId: number, user: User) {
        return await this.changeTodoStatus(todoId, user);
    }

    async deleteTodoList(todoListId: number, user: User) {
        await this.createTodo(todoListId, user);
    }


}
