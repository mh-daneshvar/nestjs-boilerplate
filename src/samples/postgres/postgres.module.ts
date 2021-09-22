import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { PostgresService } from './postgres.service';
import { PostgresController } from './postgres.controller';

@Module({
  imports: [
    DatabaseModule.register(['postgres']),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [PostgresController],
  providers: [PostgresService],
  exports: [],
})
export class PostgresModule {}
