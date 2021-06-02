import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel : Model<Product>) { }

    async getProducts() : Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProduct(id : string) : Promise<Product> {
        return await this.productModel.findById(id);
    }

    async createProduct(createProductDTO : CreateProductDTO) : Promise<Product> {
        return await new this.productModel(createProductDTO).save();
    }

    async updateProduct(id : string, createProductDTO : CreateProductDTO) : Promise<Product> {
         return await this.productModel.findByIdAndUpdate(id, createProductDTO, { new: true });
    }

    async deleteProduct(id: string) : Promise<Product> {
        return await this.productModel.findByIdAndRemove(id);
    }

}
