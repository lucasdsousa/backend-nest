import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Store } from 'src/database/entities/store.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>
    ) {}

    async findByStore(storeId: number) {
        return this.productRepository.find({
            where: { store: { id: storeId } },
            relations: ['store'],
        });
    }

    findOne(id: number) {
        return this.productRepository.findOne({ where: { id } });
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const { storeId, ...productData } = createProductDto;

        const store = await this.storeRepository.findOne({ where: {id: storeId } });
        if (!store) {
            throw new NotFoundException('Loja com ID ${storeId} não encontrada');
        }

        const product = this.productRepository.create({
            ...productData,
            store,
        });

        return this.productRepository.save(product);
    }
}
