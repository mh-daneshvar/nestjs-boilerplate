import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import Exchanges from './common/message-broker/strategies/rabbitmq/constants/exchanges';
import Queues from './common/message-broker/strategies/rabbitmq/constants/queues';
import MessageBrokerInterface from './common/message-broker/MessageBroker.interface';
import { Article } from './article.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('MessageBroker') private messageBroker: MessageBrokerInterface,
    @Inject('DatabaseConnectionProvider') private dbConnectionProvider: any,
    @InjectRepository(Article) private readonly repo: Repository<Article>,
  ) {}

  async getHello(): Promise<any> {
    const articles = await this.repo.findOne();
    console.info('\n');
    console.info('----------->');
    console.info(articles);
    console.info('----------->');

    this.dbConnectionProvider.getRedisInstance().set('framework-2', 'ReactJS');

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
