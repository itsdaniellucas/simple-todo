import { Injectable, Inject } from '@nestjs/common';
import constants from '@app/shared/constants';
import { security } from '@app/shared/appConfig.json'
import * as bcrypt from 'bcrypt'
import { LoginInput } from '@app/shared/models/input/LoginInput';
import { User } from '@app/shared/models/database/user.entity';


@Injectable()
export class UserService {
    constructor(@Inject(constants.userRepository) private userRepository: typeof User) {

    }

    async create(model: LoginInput): Promise<User> {
        let newUser = {
            username: model.username,
            hashedPassword: await bcrypt.hash(model.password, security.saltRounds)
        };

        return this.userRepository.create(newUser);
    }

    async validate(model: LoginInput): Promise<User> {
        let whereOptions = {
            username: model.username,
        };

        let userFound = await this.userRepository.findOne({ where: whereOptions });

        if(!userFound) {
            return null;
        }

        let isMatch = await bcrypt.compare(model.password, userFound.hashedPassword);

        return isMatch ? userFound : null;
    }
}
