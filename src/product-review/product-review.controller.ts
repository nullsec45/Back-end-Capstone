import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
  UseGuards
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('products')
export class ProductReviewController {
  constructor(
    private readonly productReviewService: ProductReviewService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/reviews')
  async create(
    @Param('productId') productId: string,
    @Body() createProductReviewDto: CreateProductReviewDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const reviewProduct = await this.productReviewService.create({
      ...createProductReviewDto,
      userId,
      productId
    });

    return {
      data: reviewProduct,
      statusCode: HttpStatus.CREATED,
      message: 'user successfully review',
    };
  }

  @Get(':productId/reviews')
  async findAll(@Param('productId') productId: string) {
    const reviews = await this.productReviewService.findAll(productId);
    return {
      data: reviews,
      statusCode: HttpStatus.OK,
      meta: reviews.length
    }
  }

  @Get(':productId/reviews/:id')
  async findOne(@Param('productId') productId: string, @Param('id') id: string) {
    const dataReview = await this.productReviewService.findOne(productId, id);
    return {
      data: dataReview,
      statusCode: HttpStatus.OK,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':productId/reviews/:id')
  async update(@Param('productId') productId: string, @Param('id') id: string, @Body() updateProductReviewDto: UpdateProductReviewDto) {
    const dataReview = await this.productReviewService.update(productId, id, updateProductReviewDto);

    return {
      data: dataReview,
      statusCode: HttpStatus.OK,
      message: 'review successfully update'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId/reviews/:id')
  async remove(@Param('productId') productId: string, @Param('id') id: string) {
    await this.productReviewService.remove(productId, id);

    return {
      statusCode: HttpStatus.OK,
      message: 'review successfully delete'
    }
  }
}
