import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductCartsService } from './product-carts.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('product carts')
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('product-carts')
export class ProductCartsController {
  constructor(private readonly productCartsService: ProductCartsService) { }

  @ApiBody({
    description: 'request body post product cart',
    type: CreateProductCartDto
  })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'successfully created carts',
  })
  async create(
    @Body() createProductCartDto: CreateProductCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const createProductCarts = await this.productCartsService.create({
      ...createProductCartDto,
      userId,
    });

    return {
      data: createProductCarts,
      statusCode: HttpStatus.CREATED,
      message: 'successfully created carts',
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'data all product carts',
  })
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const dataProductCart = await this.productCartsService.findAll(userId);

    return {
      data: dataProductCart,
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'data detail product cart',
  })
  @ApiResponse({
    status: 409,
    description: 'product cart not found',
  })
  async findOne(@Param('id') id: string) {
    const dataProductCart = await this.productCartsService.findOne(id);

    return {
      data: dataProductCart,
      statusCode: HttpStatus.OK,
    };
  }

  @ApiBody({
    description: 'request body patch product cart',
    type: CreateProductCartDto
  })
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'detail profile',
  })
  @ApiResponse({
    status: 409,
    description: 'product cart not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductCartDto: UpdateProductCartDto,
  ) {
    const updateProductCart = await this.productCartsService.update(
      id,
      updateProductCartDto,
    );

    return {
      data: updateProductCart,
      status: HttpStatus.OK,
      message: 'successfully update product cart',
    };
  }

  @Delete('empty-my-cart')
  @ApiResponse({
    status: 200,
    description: 'successfully empty your products in cart'
  })
  @ApiResponse({
    status: 409,
    description: 'product cart not found',
  })
  async emptyMyCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    await this.productCartsService.emptyMyCart(userId);

    return {
      statusCode: 200,
      message: 'successfully empty your products in cart',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productCartsService.remove(id);

    return {
      statusCode: 200,
      message: 'successfully delete product cart',
    };
  }
}
