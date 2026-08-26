import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  @Get('test')
  async test() {
    await this.redisService.set(
      'test:key',
      'Hello Redis',
      60,
    );

    const value = await this.redisService.get(
      'test:key',
    );

    return {
      value,
    };
  }
}