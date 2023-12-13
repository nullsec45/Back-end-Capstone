import { Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { PrismaService } from '../prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';

@Injectable()
export class ProductCartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductCartDto: CreateProductCartDto) {
    const { userId, productId, quantity } = createProductCartDto;

    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    const productCarts = await this.prisma.productInCart.create({
      data: {
        productId,
        quantity,
        cartId: cart.id,
      },
    });

    return productCarts;
  }

  async findAll(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      select: {
        id: true,
      },
      where: {
        userId,
      },
    });

    return await this.prisma.productInCart.findMany({
      include: {
        product: {
          include: {
            store: {
              select: {
                id: true,
                name: true,
                profilePicture: true,
              },
            },
            productPictures: true,
          },
        },
      },
      where: {
        cartId: cart.id,
      },
    });
  }

  async findOne(id: string) {
    const dataProductCart = await this.prisma.productInCart.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (dataProductCart) {
      return dataProductCart;
    }

    throw new ConflictCustomException('product cart not found');
  }

  async update(id: string, updateProductCartDto: UpdateProductCartDto) {
    const dataProductCart = await this.prisma.productInCart.findUnique({
      where: {
        id,
      },
    });

    if (!dataProductCart) {
      throw new ConflictCustomException('product cart not found');
    }

    const { productId, quantity } = updateProductCartDto;

    const dataProduct = await this.prisma.product.findUnique({
      select: {
        id: true,
      },
      where: {
        id: productId,
      },
    });

    if (!dataProduct) {
      throw new ConflictCustomException('product not found');
    }

    const updateProductCart = this.prisma.productInCart.update({
      where: {
        id,
      },
      data: {
        productId,
        quantity,
      },
    });

    return updateProductCart;
  }

  async remove(id: string) {
    const dataProductCart = await this.prisma.productInCart.findUnique({
      select: {
        id: true,
        cartId: true,
      },
      where: {
        id,
      },
    });

    if (!dataProductCart) {
      throw new ConflictCustomException('product cart not found');
    }

    const deleteProductCart = await this.prisma.productInCart.delete({
      where: {
        id,
      },
    });

    const dataProductCartByCartId = await this.prisma.productInCart.findMany({
      where: {
        cartId: deleteProductCart.cartId,
      },
    });

    if (dataProductCartByCartId.length === 0) {
      await this.prisma.cart.delete({
        where: {
          id: dataProductCart.cartId,
        },
      });
    }

    return deleteProductCart;
  }
}
