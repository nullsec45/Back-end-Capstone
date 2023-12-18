import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';

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
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
    });
  }

  async findByFilter(filter: any) {
    const { keyword, category, minPrice, maxPrice, city, province } = filter;

    let where: any = {};

    if (keyword) {
      where.name = {
        contains: keyword,
      };
    }

    if (category) {
      where.categoryId = category;
    }

    if (minPrice) {
      where.price = {
        gte: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      where.price = {
        lte: parseFloat(maxPrice),
      };
    }

    if (province) {
      let provinceKeyword = province.replace('-', ' ');
      provinceKeyword =
        provinceKeyword.charAt(0).toUpperCase() + provinceKeyword.slice(1);

      where.store = {
        storeAddress: {
          province: provinceKeyword,
        },
      };
    }

    if (city) {
      let cityKeyword = city.replace('-', ' ');
      cityKeyword = cityKeyword.charAt(0).toUpperCase() + cityKeyword.slice(1);

      where.store = {
        storeAddress: {
          city: cityKeyword,
        },
      };
    }

    return await this.prisma.product.findMany({
      where,
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
                province: true,
                city: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
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

  async updateStock(id: string, updateProductStockDto: UpdateProductStockDto) {
    const { stock } = updateProductStockDto;

    const updateStockTransaction = () => {
      return this.prisma.$transaction(async (tx) => {
        // 1. ambil produk sekarang dahulu untuk mengetahui stock saat ini
        const currentProduct = await tx.product.findUnique({
          where: { id },
          select: {
            id: true,
            stock: true,
          },
        });

        // 2. hitung penambahan availableStock sesuai dengan selisih antara stok sebelumya dan stock update dari request body
        const totalOfStockToBeIncrementInAvailableStock =
          stock - currentProduct.stock;

        const updateQuery = {
          where: { id },
          data: {},
          select: {
            id: true,
            stock: true,
            availableStock: true,
          },
        };

        // jika selisih nya positif (Stock brrti ditambah)
        if (totalOfStockToBeIncrementInAvailableStock >= 0) {
          updateQuery.data = {
            stock,
            availableStock: {
              increment: totalOfStockToBeIncrementInAvailableStock,
            },
          };
          // jika selisih nya negatif (Stock brrti dikurangi)
        } else {
          updateQuery.data = {
            stock,
            availableStock: {
              decrement: totalOfStockToBeIncrementInAvailableStock * -1,
            },
          };
        }

        // 3. update stock dari request body
        const updatedProduct = await tx.product.update(updateQuery);
        return updatedProduct;
      });
    };

    const updatedProduct = await updateStockTransaction();
    return updatedProduct;
  }

  async updatePrice(id: string, updateProductPriceDto: UpdateProductPriceDto) {
    const { price } = updateProductPriceDto;

    return await this.prisma.product.update({
      where: { id },
      data: {
        price,
      },
      select: {
        id: true,
        price: true,
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
