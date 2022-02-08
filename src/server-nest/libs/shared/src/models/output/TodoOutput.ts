import { Todo } from "../database/todo.entity";

export class TodoOutput {
    id: number;
    title: string;
    isDone: boolean;

    constructor(item: Partial<Todo>) {
        this.id = item.id;
        this.title = item.title;
        this.isDone = item.done;
    }
}