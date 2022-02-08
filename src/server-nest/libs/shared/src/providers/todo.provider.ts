import constants from "../constants"
import { Todo } from "../models/database/todo.entity"
import { TodoList } from "../models/database/todolist.entity"
import { TodoStats } from "../models/database/todostats.entity"


export const todoProvider = [
    {
        provide: constants.todoRepository,
        useValue: Todo
    },
    {
        provide: constants.todoListRepository,
        useValue: TodoList
    },
    {
        provide: constants.todoStatsRepository,
        useValue: TodoStats
    }
]

