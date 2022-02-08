import { CacheModule } from '@app/shared/modules/cache/cache.module';
import { DatabaseModule } from '@app/shared/modules/database/database.module';
import { todoProvider } from '@app/shared/providers/todo.provider';
import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';

@Module({
  imports: [CacheModule, DatabaseModule],
  controllers: [KafkaController],
  providers: [KafkaService, ...todoProvider],
})
export class KafkaModule {}
