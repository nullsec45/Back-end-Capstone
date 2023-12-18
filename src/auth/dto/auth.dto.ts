import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'email@example.com',
    required: true
  })

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secretpassword',
    required: true
  })

  @IsNotEmpty()
  @IsString()
  password: string;
}
