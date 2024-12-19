import { Controller, Post, Get, Request, Param, UseGuards, Req, Body, Logger } from '@nestjs/common';
import { Order } from 'src/database/entities/order.entity';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from 'src/auth/dto/order.dto';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('my-orders')
    async getMyOrders(@Request() req: any) {
        const userId = req.user.id;
        return this.ordersService.getOrdersByUser(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-orders/:orderId')
    async getMyOrderById(@Request() req: any, @Param('orderId') orderId: string) {
        const userId = req.user.id;
        return this.ordersService.getOrderByUserAndId(userId, orderId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {

        const userId = Number(req.user?.id);
        const order = { ...createOrderDto, userId };

        return await this.ordersService.createOrder(order);
    }
}
