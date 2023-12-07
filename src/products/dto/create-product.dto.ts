import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  maximumRental: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  availableStock: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productPictures: string[];

  @IsNotEmpty()
  @IsString()
  storeId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
