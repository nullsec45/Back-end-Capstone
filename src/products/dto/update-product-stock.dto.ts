import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductStockDto {
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
