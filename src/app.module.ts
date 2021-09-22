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
import { Cat, CatSchema } from './cat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cats.service';
import { ValidationModule } from './samples/validation/validation.module';
import { RedisModule } from './samples/redis/redis.module';
import { PostgresModule } from './samples/postgres/postgres.module';
import { MongoModule } from './samples/mongo/mongo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    MessageBrokerModule,
    ExceptionModule.register(),
    ResponseDecoratorModule.register(),
    ConfigModule.forRoot(),
    CacheModule.register(),
    DatabaseModule.register(['redis', 'postgres', 'mongodb']),
    // Samples
    ValidationModule,
    RedisModule,
    PostgresModule,
    MongoModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatsService],
})
export class AppModule {}
