import { IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateStoreDto {
  userId: string;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  profilePicture: string;

  @IsBoolean()
  status: boolean;
}
