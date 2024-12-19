import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from 'src/database/entities/store.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
    ) {}

    findAll() {
        return this.storeRepository.find();
    }
}
