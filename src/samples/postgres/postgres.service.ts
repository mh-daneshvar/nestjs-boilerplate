import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { Repository } from 'typeorm';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class PostgresService {
  /**
   *
   * @param productRepository
   */
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  /**
   *
   */
  public async find(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   *
   * @param id
   */
  public async findById(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException('Product not found!');
    }
  }

  /**
   *
   * @param newProduct
   */
  public async addNewProduct(newProduct: AddProductDto): Promise<Product> {
    return await this.productRepository.save(newProduct.toEntity());
  }

  /**
   *
   * @param productId
   * @param updateProduct
   */
  public async updateProduct(
    productId: string,
    updateProduct: AddProductDto,
  ): Promise<Product> {
    const product = await this.findById(productId);
    product.title = updateProduct.title || product.title;
    product.price = updateProduct.price || product.price;
    product.inventoryCount =
      updateProduct.inventoryCount || product.inventoryCount;
    return await this.productRepository.save(product);
  }

  /**
   *
   * @param productId
   */
  public async deleteProduct(productId: string): Promise<void> {
    const product = await this.findById(productId);
    await this.productRepository.delete(product);
  }
}
