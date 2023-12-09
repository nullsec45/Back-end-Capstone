import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class StoreAddress {
  @ApiProperty({
    example: 'Your Province',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    example: 'Your City',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Your District',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({
    example: 'Your Sub District',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  subDistrict: string;

  @ApiProperty({
    example: 'Your Address',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @ApiProperty({
    example: 'Your Postal Code',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({
    example: 'Your Lattitude',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({
    example: 'Your Longtitude',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  longitude: string;
}

export class CreateStoreDto {
  userId: string;

  @ApiProperty({
    example: 'Your Name Store',
    required: true
  })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'Phone Number Store (+62)',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'Description Of Store',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Account Number',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty({
    example: 'Your Bank',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  bank: string;

  @ApiProperty({
    example: 'profile-picutre-hash.(jpg|png|jpeg)',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @ApiProperty({
    example: 'true | false',
    required: false
  })
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StoreAddress)
  storeAddress: StoreAddress;
}
