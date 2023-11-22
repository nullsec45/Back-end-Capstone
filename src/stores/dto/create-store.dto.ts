import { IsNotEmpty, MaxLength, IsBoolean, IsString } from 'class-validator';

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
}
