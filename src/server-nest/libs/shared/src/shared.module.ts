import { CacheModule, Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { QueueModule } from './modules/queue/queue.module';
import { SharedService } from './shared.service';

@Module({
    imports: [
        DatabaseModule,
        QueueModule,
        CacheModule
    ],
    providers: [SharedService],
    exports: [SharedService],
})
export class SharedModule {}
