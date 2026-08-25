import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './redis.constants';

@Module({
imports: [ConfigModule, RedisModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: configService.getOrThrow<number>('REDIS_PORT'),
          password: configService.getOrThrow<string>('REDIS_PASSWORD'),

          maxRetriesPerRequest: 3,

          retryStrategy(times) {
            return Math.min(times * 100, 3000);
          },
        });
      },
    },

    RedisService,
  ],

  exports: [RedisService],
})
export class RedisModule {}
