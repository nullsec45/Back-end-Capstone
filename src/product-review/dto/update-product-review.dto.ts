import { PartialType } from '@nestjs/mapped-types';
import { CreateProductReviewDto } from './create-product-review.dto';

export class UpdateProductReviewDto extends PartialType(CreateProductReviewDto) {}
