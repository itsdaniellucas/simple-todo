import { TodoList } from "../database/todolist.entity";


export class TodoListOutput {
    id: number;
    title: string;

    constructor(item: Partial<TodoList>) {
        this.id = item.id;
        this.title = item.title;
    }
}