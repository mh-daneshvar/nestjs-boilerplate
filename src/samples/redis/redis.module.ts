import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule.register(['redis', 'postgres', 'mongodb'])],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
