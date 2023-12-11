import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductPriceDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
