import { Module } from '@nestjs/common';
import { CacheModule } from '@app/shared/modules/cache/cache.module';
import { QueueModule } from '@app/shared/modules/queue/queue.module';
import { todoProvider } from '@app/shared/providers/todo.provider';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoValidator } from './todo.validator';

@Module({
    imports: [QueueModule, CacheModule],
    controllers: [TodoController],
    providers: [TodoService, TodoValidator, ...todoProvider]
})
export class TodoModule {}
