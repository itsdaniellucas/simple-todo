import { TodoInput, TodoListInput, TodoOutput, TodoStatsOutput } from "../types/models";
import { ApiService } from "./ApiService";

export class TodoService {
    static async getTodos(todoListId: number) {
        return ApiService.GetAuth<TodoOutput[]>(`todo/list/${todoListId}`);
    }

    static async getTodoLists() {
        return ApiService.GetAuth('todo/list');
    }

    static async getTodoStats() {
        return ApiService.GetAuth<TodoStatsOutput[]>('todo/stats');
    }

    static async createTodo(todo: TodoInput) {
        return ApiService.PostAuth(`todo/list/${todo.todoListId}`, todo);
    }

    static async createTodoList(todoList: TodoListInput) {
        return ApiService.PostAuth('todo/list', todoList);
    }

    static async changeTodoStatus(todoId: number, status: boolean) {
        return ApiService.PostAuth(`todo/${todoId}/status/${status}`);
    }

    static async deleteTodo(todoId: number) {
        return ApiService.PostAuth(`todo/${todoId}/delete`);
    }

    static async deleteTodoList(todoListId: number) {
        return ApiService.PostAuth(`todo/list/${todoListId}/delete`);
    }
}