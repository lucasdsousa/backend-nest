import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsNotEmpty, IsUUID, isNumber, ValidateNested } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: { name: string; unitPrice: number; quantity: number }[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
