import constants from "../constants"
import { User } from "../models/database/user.entity"

export const userProvider = [
    {
        provide: constants.userRepository,
        useValue: User
    }
]

