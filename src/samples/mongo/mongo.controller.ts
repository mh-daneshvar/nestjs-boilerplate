import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MongoService } from './mongo.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('samples/mongo')
export class MongoController {
  constructor(private readonly mongoService: MongoService) {}

  @Get()
  public async getProducts() {
    return {
      data: {
        products: await this.mongoService.find(),
      },
    };
  }

  @Get(':id')
  public async getSingleProduct(@Param('id') productId: string) {
    return {
      data: {
        product: await this.mongoService.findById(productId),
      },
    };
  }

  @Post()
  public async addNewProduct(@Body() addProductDto: AddProductDto) {
    return {
      data: {
        product: await this.mongoService.addNewProduct(addProductDto),
      },
    };
  }

  @Patch(':id')
  public async updateProduct(
    @Body() updateProductDto: AddProductDto,
    @Param('id') productId: string,
  ) {
    return {
      data: {
        product: await this.mongoService.updateProduct(
          productId,
          updateProductDto,
        ),
      },
    };
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') productId: string) {
    await this.mongoService.deleteProduct(productId);
    return {
      httpStatus: 204,
    };
  }
}
