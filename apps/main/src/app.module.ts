import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@common/rabbitmq';

@Module({
  imports: [RabbitmqModule, ConfigModule.forRoot(), CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
