import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('store/:storeId')
    async findByStore(@Param('storeId') storeId: number) {
        return this.productService.findByStore(storeId);
    }

    @Get()
    findOne(id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }
}
