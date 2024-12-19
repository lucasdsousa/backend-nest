import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
