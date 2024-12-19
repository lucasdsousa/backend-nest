import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Get()
    findAll() {
        return this.storeService.findAll();
    }
}
