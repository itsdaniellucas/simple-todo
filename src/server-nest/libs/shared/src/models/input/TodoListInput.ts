import { IsNotEmpty, IsString } from "class-validator";

export class TodoListInput {
    @IsNotEmpty()
    @IsString()
    title: string;
}