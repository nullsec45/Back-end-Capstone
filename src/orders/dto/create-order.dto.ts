import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

enum ShippingMethod {
  PICKUP = 'PICKUP',
  GOSEND = 'GOSEND',
}

enum PaymentMethod {
  TRANSFER = 'TRANSFER',
}
class ProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  rentPeriod: number;
}

class TransactionDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userAddressId: string;

  @IsNotEmpty()
  @IsString()
  storeId: string;

  @IsNotEmpty()
  @IsEnum(ShippingMethod)
  shipping: ShippingMethod;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransactionDto)
  transaction: TransactionDto;
}
