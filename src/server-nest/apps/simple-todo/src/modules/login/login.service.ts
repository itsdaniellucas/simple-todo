import { User } from '@app/shared/models/database/user.entity';
import { LoginOutput } from '@app/shared/models/output/LoginOutput';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private jwtService: JwtService) {}

    async login(user: User): Promise<LoginOutput> {
        const payload = { username: user.username, sub: user.id }
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
