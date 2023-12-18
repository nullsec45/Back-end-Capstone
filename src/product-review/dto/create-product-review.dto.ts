import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductReviewDto {
    userId: string;

    productId: string;

    @ApiProperty({
        example: 4,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @ApiProperty({
        example: 'Good Product',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    comment: string
}
