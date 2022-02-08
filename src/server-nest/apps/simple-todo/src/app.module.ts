import { DatabaseModule } from '@app/shared/modules/database/database.module';
import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
    imports: [
        DatabaseModule,
        LoginModule,
        TodoModule
    ],
})
export class AppModule {}
