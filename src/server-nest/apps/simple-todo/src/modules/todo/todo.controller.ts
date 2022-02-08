import { Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { User } from '@app/shared/models/database/user.entity';
import { TodoInput } from '@app/shared/models/input/TodoInput';
import { TodoListInput } from '@app/shared/models/input/TodoListInput';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get('list/:todoListId')
    async getTodos(@Request() req, @Param('todoListId') todoListId: number) {
        return await this.todoService.getTodos(todoListId, req.user as User);
    }

    @Get('list')
    async getTodoLists(@Request() req) {
        return await this.todoService.getTodoLists(req.user as User);
    }

    @Get('stats')
    async getTodoStats(@Request() req) {
        return await this.todoService.getTodoStats(req.user as User);
    }

    @Post('list/:todoListId')
    async createTodo(@Request() req, @Param('todoListId') todoListId: number) {
        return await this.todoService.createTodo(req.body as TodoInput, todoListId, req.user as User);
    }

    @Post('list')
    async createTodoList(@Request() req) {
        return await this.todoService.createTodoList(req.body as TodoListInput, req.user as User);
    }

    @Post(':todoId/status/:status')
    async changeTodoStatus(@Request() req, @Param('todoId') todoId: number, @Param('status') status: boolean) {
        return await this.todoService.changeTodoStatus(todoId, status, req.user as User)
    }

    @Post(':todoId/delete')
    async deleteTodo(@Request() req, @Param('todoId') todoId: number) {
        return await this.todoService.deleteTodo(todoId, req.user as User);
    }

    @Post('list/:todoListId/delete')
    async deleteTodoList(@Request() req, @Param('todoListId') todoListId: number) {
        return await this.todoService.deleteTodoList(todoListId, req.user as User);
    }
}
