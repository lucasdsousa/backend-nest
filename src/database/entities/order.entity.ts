import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column('decimal')
    totalPrice: number;

    @Column('json')
    items: { name: string; unitPrice: number; quantity: number }[];

    @Column({ type: 'enum', enum: ['APROVADO', 'ENTREGUE', 'CANCELADO'], default: 'APROVADO' })
    status: string;
}