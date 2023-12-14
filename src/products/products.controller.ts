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
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
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

  @Get('filter')
  async findByFilter(@Query() query: any) {
    const {
      keyword = "",
      category = "",
      minPrice = "",
      maxPrice = "",
      city = "",
      province = ""
    } = query;

    const filter = {
      keyword,
      category,
      minPrice,
      maxPrice,
      city,
      province
    }

    const products = await this.productsService.findByFilter(filter);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update-stock')
  @HttpCode(HttpStatus.OK)
  async updateStock(
    @Param('id') id: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const updatedProduct = await this.productsService.updateStock(
      id,
      updateProductStockDto,
    );

    return {
      data: updatedProduct,
      statusCode: HttpStatus.OK,
      message: 'product stock sucessfully updated',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update-price')
  @HttpCode(HttpStatus.OK)
  async updatePrice(
    @Param('id') id: string,
    @Body() updateProductPriceDto: UpdateProductPriceDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const updatedProduct = await this.productsService.updatePrice(
      id,
      updateProductPriceDto,
    );

    return {
      data: updatedProduct,
      statusCode: HttpStatus.OK,
      message: 'product price sucessfully updated',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    await this.productsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'product successfully deleted',
    };
  }
}
