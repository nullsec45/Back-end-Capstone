import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const { name, description, profilePicture, userId } = createStoreDto;

    return await this.prisma.store.create({
      data: {
        name,
        description,
        profilePicture,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.store.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
        storeAddress: true,
      },
    });
  }

  update(id: string, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
