import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Todo } from "./todo.entity";
import { User } from "./user.entity";

@Table
export class TodoList extends Model {
    @Column
    title: string;

    @HasMany(() => Todo)
    todos: Todo[];

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}