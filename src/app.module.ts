import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageBrokerModule } from './common/message-broker/messageBroker.module';
import { ExceptionModule } from './common/exception/exception.module';
import { ResponseDecoratorModule } from './common/response-decorator/responseDecorator.module';

@Module({
  imports: [
    MessageBrokerModule,
    ExceptionModule.register(),
    ResponseDecoratorModule.register(),
    ConfigModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
