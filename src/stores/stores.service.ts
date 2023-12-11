import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const {
      name,
      phoneNumber,
      description,
      bank,
      accountHolder,
      accountNumber,
      profilePicture,
      userId,
      storeAddress,
    } = createStoreDto;

    const isStoreNameExist = await this.findByName(name);
    if (isStoreNameExist)
      throw new ConflictCustomException('store name duplicated');

    return await this.prisma.store.create({
      data: {
        name,
        phoneNumber,
        description,
        bank,
        accountHolder,
        accountNumber,
        profilePicture,
        userId,
        storeAddress: {
          create: {
            ...storeAddress,
          },
        },
      },
      include: {
        storeAddress: true,
      },
    });
  }

  private async findByName(storeName: string) {
    return await this.prisma.store.findUnique({
      where: { name: storeName },
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.store.findUnique({
      where: {
        userId,
      },
      include: {
        orders: {
          include: {
            transaction: true,
            products: {
              select: {
                productId: true,
                price: true,
                quantity: true,
                rentFrom: true,
                rentTo: true,
                subTotal: true,
              },
            },
          },
        },
        products: {
          include: {
            orders: {
              select: {
                id: true,
              },
            },
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
        storeAddress: true,
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
    const {
      name,
      phoneNumber,
      description,
      bank,
      accountHolder,
      accountNumber,
      profilePicture,
      status,
      storeAddress,
    } = updateStoreDto;

    return await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        name,
        phoneNumber,
        description,
        bank,
        accountHolder,
        accountNumber,
        profilePicture,
        status,
        storeAddress: {
          update: {
            ...storeAddress,
          },
        },
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
