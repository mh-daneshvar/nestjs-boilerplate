import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private redisInstance: any;
  constructor(
    @Inject('DatabaseConnectionProvider') private dbConnectionProvider: any,
  ) {
    this.redisInstance = this.dbConnectionProvider.getRedisInstance();
  }

  public async getCounter(): Promise<number> {
    return +(await this.redisInstance.getAsync('counter')) || 0;
  }

  public async increaseCounter(): Promise<number> {
    const currentCounter = +(await this.redisInstance.getAsync('counter')) || 0;
    const updatedCounter = currentCounter + 1;
    await this.redisInstance.set('counter', updatedCounter);
    return updatedCounter;
  }
}
