import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Queues from './common/message-broker/strategies/rabbitmq/constants/queues';
import MessageBrokerInterface from './common/message-broker/MessageBroker.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('MessageBroker') private messageBroker: MessageBrokerInterface,
  ) {}

  async getHello(): Promise<any> {
    const salam = Date.now();
    this.messageBroker.publish(Queues.publishing.login, {
      key: 'salam be rooye mahet ' + salam,
    });
    if (!salam) {
      await this.cacheManager.set('key', 'fuck this world');
      return 'Hello World!';
    }
    return salam;
  }
}
