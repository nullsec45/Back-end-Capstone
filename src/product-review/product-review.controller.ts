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
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('product reviews')
@Controller('products')
export class ProductReviewController {
  constructor(
    private readonly productReviewService: ProductReviewService
  ) { }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'request body post product reciew',
    type: CreateProductReviewDto
  })
  @Post(':productId/reviews')
  @ApiResponse({
    status: 201,
    description: 'user successfully review',
  })
  @ApiResponse({
    status: 409,
    description: 'user already review',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data all reviews product',
  })
  async findAll(@Param('productId') productId: string) {
    const reviews = await this.productReviewService.findAll(productId);
    return {
      data: reviews,
      statusCode: HttpStatus.OK,
      meta: reviews.length
    }
  }

  @Get(':productId/reviews/:id')
  @ApiResponse({
    status: 200,
    description: 'data detail review',
  })
  @ApiResponse({
    status: 409,
    description: 'review not found',
  })
  async findOne(@Param('productId') productId: string, @Param('id') id: string) {
    const dataReview = await this.productReviewService.findOne(productId, id);
    return {
      data: dataReview,
      statusCode: HttpStatus.OK,
    }
  }

  @ApiBody({
    description: 'request body patch product reciew',
    type: CreateProductReviewDto
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'review successfully update',
  })
  @ApiResponse({
    status: 409,
    description: 'review not found',
  })
  @Patch(':productId/reviews/:id')
  async update(@Param('productId') productId: string, @Param('id') id: string, @Body() updateProductReviewDto: UpdateProductReviewDto) {
    const dataReview = await this.productReviewService.update(productId, id, updateProductReviewDto);

    return {
      data: dataReview,
      statusCode: HttpStatus.OK,
      message: 'review successfully update'
    }
  }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':productId/reviews/:id')
  @ApiResponse({
    status: 200,
    description: 'review successfully delete',
  })
  @ApiResponse({
    status: 409,
    description: 'review not found',
  })
  async remove(@Param('productId') productId: string, @Param('id') id: string) {
    await this.productReviewService.remove(productId, id);

    return {
      statusCode: HttpStatus.OK,
      message: 'review successfully delete'
    }
  }
}
