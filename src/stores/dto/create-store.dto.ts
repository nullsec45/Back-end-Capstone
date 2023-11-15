import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateStoreDto {
  @Exclude()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  profilePicture: string;
}
