import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const createdCategory = await this.categoriesService.create(createCategoryDto);

    return {
      data: createdCategory,
      statusCode: HttpStatus.CREATED,
      message: 'category sucessfully created',
    };
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(id);

    return {
      data: category,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
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
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    await this.categoriesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'category successfully deleted',
    };
  }
}
