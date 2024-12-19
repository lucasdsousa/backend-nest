import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../entities/store.entity';
import { Product } from '../entities/product.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Product])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
