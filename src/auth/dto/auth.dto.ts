import { IsEmail, IsString, IsNotEmpty } from "class-validator";


export class AuthDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string;
}
