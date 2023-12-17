import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPriceDto {
  @ApiProperty({
    example: 1000000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
