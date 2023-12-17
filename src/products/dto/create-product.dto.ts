import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product Description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 130000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 12,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  maximumRental: number;

  @ApiProperty({
    example: 42,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 37,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  availableStock: number;

  @ApiProperty({
    example: ["https://example.com/pictures/laptop_asus.jpg"],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productPictures: string[];

  @ApiProperty({
    example: '76425f30-c4ac-4800-89cd-93530864ef47',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  storeId: string;

  @ApiProperty({
    example: 'c789d31c-5094-4a3b-b30f-1bdeb222db96',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
