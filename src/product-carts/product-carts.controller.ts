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
  Req
} from '@nestjs/common';
import { ProductCartsService } from './product-carts.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product carts')
@Controller('product-carts')
export class ProductCartsController {
  constructor(private readonly productCartsService: ProductCartsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductCartDto: CreateProductCartDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    const createProductCarts = await this.productCartsService.create({
      ...createProductCartDto,
      userId
    });

    return {
      data: createProductCarts,
      statusCode: HttpStatus.CREATED,
      message: 'successfully created carts'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub
    const dataProductCart = await this.productCartsService.findAll(userId);

    return {
      data: dataProductCart,
      statusCode: HttpStatus.OK
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataProductCart = await this.productCartsService.findOne(id);

    return {
      data: dataProductCart,
      statusCode: HttpStatus.OK
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductCartDto: UpdateProductCartDto) {
    const updateProductCart = await this.productCartsService.update(id, updateProductCartDto);

    return {
      data: updateProductCart,
      status: HttpStatus.OK,
      message: 'successfully update product cart'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productCartsService.remove(id);

    return {
      statusCode: 200,
      message: 'successfully delete product cart'
    }
  }
}
