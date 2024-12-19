import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @ManyToOne(() => Store, (store) => store.products, { onDelete: 'CASCADE', nullable: false })
    store: Store;
}