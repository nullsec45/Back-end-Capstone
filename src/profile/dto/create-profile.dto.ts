import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsDateString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum Gender {
    Laki = "LAKI",
    Perempuan = "PEREMPUAN"
}

export class CreateProfileDto {
    userId: string;

    @ApiProperty({
        example: 'Rama Fajar',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({
        example: '<url_picture_profile>',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    profilePicture: string;

    @ApiProperty({
        example: 'LAKI | PEREMPUAN',
        required: true,
    })
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({
        example: '2023-12-01',
        required: true,
    })
    @IsNotEmpty()
    @IsDateString()
    dateOfbirth: string

    @ApiProperty({
        example: '0812345678',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}
