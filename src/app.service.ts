import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import MessageBrokerInterface from './common/message-broker/MessageBroker.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('MessageBroker') private messageBroker: MessageBrokerInterface,
  ) {}

  async getHello(): Promise<any> {
    const salam = Date.now();

    this.messageBroker.publish('user.add', '1', {
      key: 'salam be rooye mahet ' + salam,
    });

    // this.messageBroker.publish('user.update', '1', {
    //   key: 'salam be rooye fucket ' + salam,
    // });

    if (!salam) {
      await this.cacheManager.set('key', 'fuck this world');
      return 'Hello World!';
    }
    return salam;
  }
}
