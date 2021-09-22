import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from '../models/product.entity';

export class AddProductDto implements Readonly<AddProductDto> {
  @IsUUID()
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  inventoryCount: number;

  /**
   * Convert the current dto to a new product
   *
   * @returns product: Product
   */
  toEntity(): Product {
    const product = new Product();
    product.title = this.title;
    product.price = this.price;
    product.inventoryCount = this.inventoryCount;
    return product;
  }
}
