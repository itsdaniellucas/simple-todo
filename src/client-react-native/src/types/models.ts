export interface IModel {
    id: number,
}

export interface TodoSectionType extends IModel {
    title: string,
    done: number,
    total: number,
}

export interface TodoItemType extends IModel {
    title: string,
    isDone: boolean,
}

export interface TodoInput {
    title: string,
    done: boolean,
    todoListId: number,
}

export interface TodoListInput {
    title: string,
}

export interface LoginOutput {
    token: string,
}

export interface TodoStatsOutput extends TodoSectionType {
    todoListId: number,
}

export interface TodoOutput extends TodoItemType {

}