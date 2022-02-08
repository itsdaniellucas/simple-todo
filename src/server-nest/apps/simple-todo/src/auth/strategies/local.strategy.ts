import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { LoginInput } from '@app/shared/models/input/LoginInput';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const userVM: LoginInput = {
            username,
            password
        };

        const user = await this.userService.validate(userVM);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}