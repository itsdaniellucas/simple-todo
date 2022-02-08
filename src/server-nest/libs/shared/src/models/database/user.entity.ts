import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { TodoList } from "./todolist.entity";

@Table
export class User extends Model {
    @Column
    username: string;

    @Column
    hashedPassword: string;

    @HasMany(() => TodoList)
    todoLists: TodoList[]
}