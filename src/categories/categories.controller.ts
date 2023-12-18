import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'request body post category product',
    type: CreateCategoryDto
  })
  @Post()
  @ApiResponse({
    status: 200,
    description: 'category sucessfully created',
  })
  @ApiResponse({
    status: 409,
    description: 'category is exist',
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoriesService.create(createCategoryDto);

    return {
      data: createdCategory,
      statusCode: HttpStatus.CREATED,
      message: 'category sucessfully created',
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'data all categories',
  })
  async findAll() {
    const categories = await this.categoriesService.findAll();

    return {
      data: categories,
      statusCode: HttpStatus.OK,
      meta: {
        totalItem: categories.length,
      }
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'data detail category',
  })
  @ApiResponse({
    status: 409,
    description: 'category not found',
  })
  findOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(id);

    return {
      data: category,
      statusCode: HttpStatus.OK,
    };
  }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'request body patch category product',
    type: CreateCategoryDto
  })
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'category sucessfully updated',
  })
  @ApiResponse({
    status: 409,
    description: 'category not found',
  })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const updatedCategory = this.categoriesService.update(id, updateCategoryDto);

    return {
      data: updatedCategory,
      statusCode: HttpStatus.OK,
      message: 'category sucessfully updated',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'category successfully deleted',
  })
  @ApiResponse({
    status: 409,
    description: 'category not found!',
  })
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    await this.categoriesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'category successfully deleted',
    };
  }
}
