import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const { name, description, profilePicture, userId, accountNumber } =
      createStoreDto;

    const isStoreNameExist = await this.findByName(name);
    if (isStoreNameExist)
      throw new ConflictCustomException('store name duplicated');

    return await this.prisma.store.create({
      data: {
        name,
        description,
        accountNumber,
        profilePicture,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async findByName(storeName: string) {
    return await this.prisma.store.findUnique({
      where: { name: storeName },
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
        orders: {
          include: {
            transaction: {
              select: {
                id: true,
                paymentMethod: true,
                paymentProof: true,
                status: true,
                transactionAmount: true,
                updatedAt: true,
              },
            },
          },
        },
        products: true,
        storeAddress: true,
      },
    });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
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
  }

  async remove(id: string) {
    return await this.prisma.store.delete({
      where: {
        id,
      },
    });
  }
}
