import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongoController } from './mongo.controller';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule.register(['mongodb'])],
  controllers: [MongoController],
  providers: [MongoService],
  exports: [],
})
export class MongoModule {}
