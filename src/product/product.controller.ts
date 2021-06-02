import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO : CreateProductDTO ) {
        
        const product = await this.productService.createProduct(createProductDTO);

        return res.status(HttpStatus.OK).json({
            msg: 'Product Successfully Created.',
            product
        });

    }

    @Get('/')
    async getProducts(@Res() res){

        const products = await this.productService.getProducts();

        return res.status(HttpStatus.OK).json({
            products
        });

    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id) {
        
        const product = await this.productService.getProduct(id);

        if(!product) throw new NotFoundException('Product Does not exists.')

        return res.status(HttpStatus.OK).json({
            product
        });

    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('id') id, @Body() createProductDTO : CreateProductDTO ) {

        const updatedProduct = await this.productService.updateProduct(id, createProductDTO);

        if(!updatedProduct) throw new NotFoundException('Product Does not exists.')

        return res.status(HttpStatus.OK).json({
            msg: "Product Updated Succesfully",
            updatedProduct
        });

    }        

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('id') id) {

        const deletedProduct = await this.productService.deleteProduct(id);

        if(!deletedProduct) throw new NotFoundException('Product Does not exists.')

        return res.status(HttpStatus.OK).json({
            msg: "Product Deleted Succesfully",
            deletedProduct
        });
        
    }
}
