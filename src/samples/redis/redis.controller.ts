import { Controller, Get, Patch } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('/samples/redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  public async getCounter() {
    return {
      data: {
        counter: await this.redisService.getCounter(),
      },
    };
  }

  @Patch()
  public async increaseCounter() {
    return {
      data: {
        counter: await this.redisService.increaseCounter(),
      },
    };
  }
}
