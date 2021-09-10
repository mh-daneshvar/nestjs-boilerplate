import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RabbitmqService } from '@common/rabbitmq';

@Injectable()
export class AppService {
  /**
   *
   * @param cacheManager
   * @param rabbitmqService
   */
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(RabbitmqService) private rabbitmqService: RabbitmqService,
  ) {}

  /**
   *
   */
  async getHello(): Promise<any> {
    await this.rabbitmqService.publish(
      'processing',
      'request',
      'salam be rooye mahet ' + Date.now(),
    );

    const salam = Date.now();
    if (!salam) {
      await this.cacheManager.set('key', 'fuck this world');
      return 'Hello World!';
    }
    return salam;
  }
}
