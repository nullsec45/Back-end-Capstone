import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductCartDto {
  userId: string;
  cartId: string;

  @ApiProperty({
    example: '<product_id>',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: '<date_time_string>',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  rentFrom: string;

  @ApiProperty({
    example: '<date_time_string>',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  rentTo: string;
}
