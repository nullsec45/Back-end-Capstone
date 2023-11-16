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

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    try {
      const { name, description, profilePicture, status } = updateStoreDto;

      return await this.prisma.store.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          profilePicture,
          status,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.store.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
