import { User } from '@app/shared/models/database/user.entity';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/guards/local.guard';
import { LoginService } from './login.service';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(LocalAuthGuard)
    @Post('authenticate')
    async login(@Request() req) {
        return await this.loginService.login(req.user as User);
    }
}
