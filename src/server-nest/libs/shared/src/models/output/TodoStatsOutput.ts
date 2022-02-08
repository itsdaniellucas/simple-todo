import { TodoStats } from "../database/todostats.entity";

export class TodoStatsOutput {
    id: number;
    title: string;
    done: number;
    total: number;
    todoListId: number;

    constructor(item: Partial<TodoStats> & { title?: string }) {        
        this.id = item.id;
        this.title = item.title;
        this.done = item.done;
        this.total = item.total;
        this.todoListId = item.todoListId;
    }
}