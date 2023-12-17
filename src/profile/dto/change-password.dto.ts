import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
    @ApiProperty({
        example: 'OldPassword_',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @ApiProperty({
        example: 'NewPassword_',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string
}