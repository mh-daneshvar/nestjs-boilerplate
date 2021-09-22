import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.entity';
import { Model } from 'mongoose';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class MongoService {
  /**
   *
   * @param productModel
   */
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  /**
   *
   */
  public async find(): Promise<Product[]> {
    return this.productModel.find();
  }

  /**
   *
   * @param id
   */
  public async findById(id: string): Promise<Product> {
    try {
      return await this.productModel.findById(id);
    } catch (e) {
      throw new NotFoundException('Product not found!');
    }
  }

  /**
   *
   * @param newProduct
   */
  public async addNewProduct(newProduct: AddProductDto): Promise<Product> {
    const product = new this.productModel(newProduct);
    return await product.save();
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
    const product = await this.productModel
      .findByIdAndUpdate(productId, updateProduct)
      .setOptions({
        overwrite: true,
        new: true,
      });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  /**
   *
   * @param productId
   */
  public async deleteProduct(productId: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(productId);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
  }
}
