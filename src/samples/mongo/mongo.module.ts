import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongoController } from './mongo.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.entity';

@Module({
  imports: [
    DatabaseModule.register(['mongodb']),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [MongoController],
  providers: [MongoService],
  exports: [],
})
export class MongoModule {}
