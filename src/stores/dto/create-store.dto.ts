import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  IsString,
  ValidateNested,
} from 'class-validator';

class StoreAddress {
  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  subDistrict: string;

  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;
}

export class CreateStoreDto {
  userId: string;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StoreAddress)
  storeAddress: StoreAddress;
}
