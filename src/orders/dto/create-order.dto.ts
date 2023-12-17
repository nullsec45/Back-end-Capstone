import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ShippingMethod {
  PICKUP = 'PICKUP',
  GOSEND = 'GOSEND',
}

enum PaymentMethod {
  TRANSFER = 'TRANSFER',
  COD = 'COD',
}

class ProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsDateString()
  rentFrom: string;

  @IsNotEmpty()
  @IsDateString()
  rentTo: string;
}

class TransactionDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '5b2eec3e-fb00-4aca-b768-d6b6cc820372',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userAddressId: string;

  @ApiProperty({
    example: '5b2eec3e-fb00-4aca-b768-d6b6cc820372',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  storeId: string;

  @ApiProperty({
    example: 'GOSEND',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ShippingMethod)
  shipping: ShippingMethod;

  @ApiProperty({
    example: [
      {
        "id": "5b2eec3e-fb00-4aca-b768-d6b6cc820372",
        "quantity": 1,
        "rentFrom": "2023-12-02T17:00:00.000Z",
        "rentTo": "2023-12-04T17:00:00.000Z"
      }
    ],
    required: true,
  })
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @ApiProperty({
    example: {
      "paymentMethod": "TRANSFER"
    },
    required: true
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransactionDto)
  transaction: TransactionDto;
}
