import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login.controller';
import { jwt } from '@app/shared/appConfig.json'
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { userProvider } from '@app/shared/providers/user.provider'
import { LocalStrategy } from '../../auth/strategies/local.strategy';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { LoginService } from './login.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwt.secret,
            signOptions: {
                expiresIn: jwt.expiration
            }
        }),
    ],
    controllers: [
        LoginController,
    ],
    providers: [LoginService, UserService, ...userProvider, LocalStrategy, JwtStrategy]
})
export class LoginModule {}
