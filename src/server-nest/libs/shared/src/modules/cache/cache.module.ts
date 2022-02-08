import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import type { ClientOpts as RedisClientOpts } from 'redis'
import * as redisStore from 'cache-manager-redis-store'
import { cache } from '../../appConfig.json'
import { CacheService } from './cache.service';

@Module({
    imports: [
        NestCacheModule.register<RedisClientOpts>({
            store: redisStore,
            host: cache.host,
            port: cache.port,
            ttl: cache.ttl,
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule {}
