import { Inject, Injectable, Logger } from '@nestjs/common';

import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService {
     private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {
    this.redis.on('connect', () => {
      this.logger.log('Redis connected');
    });

    this.redis.on('ready', () => {
      this.logger.log('Redis ready');
    });

    this.redis.on('error', (error) => {
      this.logger.error(`Redis error: ${error.message}`);
    });

    this.redis.on('close', () => {
      this.logger.warn('Redis connection closed');
    });
  }


  async set(
    key: string,
    value: any,
    ttl?: number,
  ): Promise<'OK'> {
    if (ttl) {
      return this.redis.set(key, value, 'EX', ttl);
    }

    return this.redis.set(key, value);
  }

    async get<T>(key: string): Promise<T | null> {
      const data = await this.redis.get(key);

      if (!data) {
        return null;
      }

      return JSON.parse(data) as T;
    }


  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<number> {
    return this.redis.exists(key);
  }

  async lpush(key: string, value: any){
      return this.redis.lpush(key, value)
  }
  async sadd(key: string, value: any) {
      console.log('Redis SADD:', key, value);
      return this.redis.sadd(key, value);
  }

  async smembers(key: string) {
      console.log('Redis SMEMBERS:', key);
      return this.redis.smembers(key);
  }
  async lrange(key: string, idx1: number, idx2: number){
    return await this.redis.lrange(
        key,
        idx1,
        idx2,
    );
  }

  async onModuleDestroy() {
    await this.redis.quit();

    this.logger.log('Redis connection closed');
  }

}
