import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateProductCartDto {
    userId: string
    cartId: string

    @IsNotEmpty()
    @IsString()
    productId: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}