import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";

export class TodoInput {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    done: boolean;

    @IsNumber()
    todoListId: number;
}