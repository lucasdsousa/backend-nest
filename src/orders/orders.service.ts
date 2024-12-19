import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { CreateOrderDto } from 'src/auth/dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Obtém todos os pedidos feitos pelo usuário autenticado
  // Obter todos os pedidos feitos pelo usuário autenticado
async getOrdersByUser(userId: number): Promise<any[]> {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } }, // Certifique-se de usar o relacionamento corretamente
      order: { createdAt: 'DESC' },
    });
  
    if (orders.length === 0) {
      throw new NotFoundException('Nenhum pedido encontrado.');
    }
  
    return orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      items: order.items,
      totalPrice: order.totalPrice,
      status: order.status,
    }));
  }
  
  // Obter um pedido específico feito pelo usuário autenticado
  async getOrderByUserAndId(userId: number, orderId: string): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
    });
  
    if (!order) {
      throw new NotFoundException(
        'Pedido não encontrado ou você não tem permissão para acessá-lo.'
      );
    }
  
    return {
      id: order.id,
      createdAt: order.createdAt,
      items: order.items,
      totalPrice: order.totalPrice,
      status: order.status,
    };
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const { userId, items, totalPrice } = orderDto;
    console.log('recebido no serviço:', orderDto);

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('Você precisa estar logado para comprar.');
    }

    const newOrder = this.orderRepository.create({
      user,
      totalPrice,
      items,
      status: 'APROVADO',
    });

    return await this.orderRepository.save(newOrder);
  }
  
}
