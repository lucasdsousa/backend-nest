import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    birth: Date;

    @Column()
    password: string;

    @Column('text') // Usa o tipo 'text' para armazenar JSON serializado como string
    address: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}