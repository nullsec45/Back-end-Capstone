import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const isCategoryExist = await this.findByName(createCategoryDto.name);
    const { ...category } = createCategoryDto;

    if (isCategoryExist) throw new ConflictCustomException('category is exist');

    return await this.prisma.category.create({
      data: {
        ...category,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (category) {
      const { ...data } = category;

      return {
        data,
        statusCode: 200,
      };
    }

    throw new ConflictCustomException('category not found!');

  }

  async findByName(name: string) {
    return await this.prisma.category.findUnique({
      where: {
        name: name, // Add the name property
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async update(idCategory: string, updateCategoryDto: UpdateCategoryDto) {
    const { ...category } = updateCategoryDto;
    const isCategoryExist = await this.findByName(updateCategoryDto.name);

    this.findOne(idCategory);

    const { id, name } = isCategoryExist;

    if (updateCategoryDto.name == name && idCategory !== id) throw new ConflictCustomException('category is exist');

    return await this.prisma.category.update({
      where: { id: idCategory },
      data: {
        ...category,
      },
    });
  }

  async remove(id: string) {
    this.findOne(id);

    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
