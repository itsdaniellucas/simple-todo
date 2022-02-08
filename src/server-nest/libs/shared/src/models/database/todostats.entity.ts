import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { TodoList } from "./todolist.entity";

@Table
export class TodoStats extends Model {
    @Column
    done: number;

    @Column
    total: number;

    @ForeignKey(() => TodoList)
    @Column
    todoListId: number;

    @BelongsTo(() => TodoList)
    todoList: TodoList;
}