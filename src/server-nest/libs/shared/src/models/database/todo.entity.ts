import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { TodoList } from "./todolist.entity";

@Table
export class Todo extends Model {
    @Column
    title: string;

    @Column
    done: boolean;

    @ForeignKey(() => TodoList)
    @Column
    todoListId: number;

    @BelongsTo(() => TodoList)
    todoList: TodoList;
}