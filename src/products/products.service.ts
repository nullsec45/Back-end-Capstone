import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { productPictures, ...product } = createProductDto;
    const transformedProductPictures = productPictures.map((url) => ({
      url,
    }));

    return await this.prisma.product.create({
      data: {
        ...product,
        availableStock: product.stock,
        productPictures: {
          createMany: {
            data: transformedProductPictures,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        productPictures: true,
        store: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
            verified: true,
            storeAddress: {
              select: {
                city: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        store: {
          include: {
            storeAddress: true,
          },
        },
        reviews: true,
        productPictures: true,
        orders: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { productPictures, ...product } = updateProductDto;
    const transformedProductPictures = productPictures.map((url) => ({
      url,
    }));

    return await this.prisma.product.update({
      where: { id },
      data: {
        ...product,
        productPictures: {
          deleteMany: {}, // hapus dulu semua gambar yang terkait dengan id product saat ini
          createMany: {
            data: transformedProductPictures,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: { id },
      include: {
        productPictures: true,
        reviews: true,
      },
    });
  }
}
