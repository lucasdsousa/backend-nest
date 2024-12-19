import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from '../database/entities/product.entity';
import { StoreModule } from 'src/store/store.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), StoreModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
