import { IsString, IsEmail, IsNotEmpty } from 'class-validator';


export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
