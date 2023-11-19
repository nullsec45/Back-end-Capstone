import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticatedRequest } from 'typings';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // JWT AUTHGUARD "BELUM DIIMPLEMENTASI"
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.id;
    const createdProduct = await this.productsService.create(createProductDto);

    return {
      data: createdProduct,
      statusCode: HttpStatus.CREATED,
      message: 'product sucessfully created',
    };
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    return {
      data: products,
      statusCode: HttpStatus.OK,
      meta: {
        totalItems: products.length,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);

    return {
      data: product,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
    );

    return {
      data: updatedProduct,
      statusCode: HttpStatus.OK,
      message: 'product sucessfully updated',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'product successfully deleted',
    };
  }
}
