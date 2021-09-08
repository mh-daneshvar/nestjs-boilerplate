import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Exchanges from './common/message-broker/strategies/rabbitmq/constants/exchanges';
import Queues from './common/message-broker/strategies/rabbitmq/constants/queues';
import MessageBrokerInterface from './common/message-broker/messageBroker.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('MessageBroker') private messageBroker: MessageBrokerInterface,
  ) {}

  async getHello(): Promise<any> {
    await this.messageBroker.publish(
      Exchanges.processing.name,
      Queues.requests.bindingKey,
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
