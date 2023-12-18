import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductStockDto {
  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
