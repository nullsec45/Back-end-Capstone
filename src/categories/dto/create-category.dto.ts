import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCategoryDto {
    @ApiProperty({
        example: 'category product',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'description category',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
