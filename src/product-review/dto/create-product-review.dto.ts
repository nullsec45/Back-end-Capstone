import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProductReviewDto {
    userId: string;

    productId: string;

    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @IsNotEmpty()
    @IsString()
    comment: string
}
