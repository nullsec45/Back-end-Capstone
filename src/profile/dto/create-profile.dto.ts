import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsDateString
} from "class-validator";

enum Gender {
    Laki = "LAKI",
    Perempuan = "PEREMPUAN"
}

export class CreateProfileDto {
    userId: string;

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    profilePicture: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    @IsDateString()
    dateOfbirth: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}
