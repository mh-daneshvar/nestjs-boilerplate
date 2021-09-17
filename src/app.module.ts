import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageBrokerModule } from './common/message-broker/messageBroker.module';
import { ExceptionModule } from './common/exception/exception.module';
import { ResponseDecoratorModule } from './common/response-decorator/responseDecorator.module';
import { DatabaseModule } from './common/database/database.module';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    MessageBrokerModule,
    ExceptionModule.register(),
    ResponseDecoratorModule.register(),
    ConfigModule.forRoot(),
    CacheModule.register(),
    DatabaseModule.register('redis'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
