import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap{
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async onApplicationBootstrap() {
        await this.seedDatabase();
    }

     async seedDatabase(): Promise<void> {
        const storeCount = await this.storeRepository.count();
        if (storeCount > 0) {
            console.log('Seed já executado. Pulando...');
            return;
        }

        console.log('Executando seed banco de dados...');

        
        const createdStores = await this.storeRepository.save([
            { name: 'Loja A' },
            { name: 'Loja B' },
            { name: 'Loja C' },
        ]);
        
        const products = [
            { name: 'Produto A1', price: 10, store: createdStores[0] },
            { name: 'Produto A2', price: 20, store: createdStores[0] },
            { name: 'Produto A3', price: 25, store: createdStores[0] },
    
            { name: 'Produto B1', price: 10, store: createdStores[1] },
            { name: 'Produto B2', price: 20, store: createdStores[1] },
            { name: 'Produto B3', price: 25, store: createdStores[1] },
    
            { name: 'Produto C1', price: 10, store: createdStores[2] },
            { name: 'Produto C2', price: 20, store: createdStores[2] },
            { name: 'Produto C3', price: 25, store: createdStores[2] },
        ];

        await this.productRepository.save(products);

        console.log('Banco de dados populado com sucesso');
    }
}