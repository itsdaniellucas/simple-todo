import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getOrFetch<T = any>(key: string, fetch: () => Promise<T>): Promise<T> {
        const cached = await this.get(key);
        if(cached) {
            return cached as T;
        } else {
            return await fetch();
        }
    }

    async get(key: string) {
        return await this.cacheManager.get(key);
    }

    async set(key: string, value: any) {
        await this.cacheManager.set(key, value);
    }

    async del(key: string) {
        await this.cacheManager.del(key);
    }
}
