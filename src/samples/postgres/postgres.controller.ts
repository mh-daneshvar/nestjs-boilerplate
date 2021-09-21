import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('/samples/postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Get()
  public async getProducts() {
    return {
      data: {
        products: await this.postgresService.find(),
      },
    };
  }

  @Get(':id')
  public async getSingleProduct(@Param('id') productId: string) {
    return {
      data: {
        product: await this.postgresService.findById(productId),
      },
    };
  }

  @Post()
  public async addNewProduct(@Body() addProductDto: AddProductDto) {
    return {
      data: {
        product: await this.postgresService.addNewProduct(addProductDto),
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
        product: await this.postgresService.updateProduct(
          productId,
          updateProductDto,
        ),
      },
    };
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') productId: string) {
    await this.postgresService.deleteProduct(productId);
    return {
      httpStatus: 204,
    };
  }
}
