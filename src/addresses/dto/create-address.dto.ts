import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Home | Office',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({
    example: 'Fajar',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  recipientName: string;

  @ApiProperty({
    example: '082112345678',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'DKI Jakarta',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    example: 'Jakarta Selatan',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Manggarai',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({
    example: 'Bukit Duri',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  subDistrict: string;

  @ApiProperty({
    example: 'Jl.Bukit Duri',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @ApiProperty({
    example: '1330123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({
    example: '-7.12449482',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({
    example: '107.9873926',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  longitude: string;
}
