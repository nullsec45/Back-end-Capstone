/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma.service';
import { ProductsService } from '../products/products.service';
import {
  calculateOrderPriceDetails,
  checkStockAvailability,
  mappingOrderPriceDetailProducts,
} from './utils';
import { BadRequestCustomException } from '../../customExceptions/BadRequestCustomException';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const {
      products: productsInRequest,
      shipping,
      transaction,
      userAddressId,
      storeId,
    } = createOrderDto;

    const orderTransaction = () => {
      return this.prisma.$transaction(async (tx) => {
        // 1. Ambil info produk dulu
        const productInfo = await tx.product.findMany({
          where: {
            id: {
              in: productsInRequest.map((product) => product.id),
            },
          },
          select: {
            id: true,
            price: true,
            stock: true,
            availableStock: true,
            maximumRental: true,
          },
        });

        // 2. Cek apakah stok masih tersedia (cek menggunakan kolom availableStock)
        const isStockAvailable = checkStockAvailability(
          productsInRequest,
          productInfo,
        );
        if (!isStockAvailable)
          throw new BadRequestCustomException(
            'stock not available, please reduce the quantity',
          );

        // ??? MUNGKIN BISA DI CEK JUGA Maximal Rental nyaq, tapi SKIP DULUU ngejar MVP

        // 3 Siapkan dulu object yang digunakan untuk query ke database
        const orderPriceDetails = calculateOrderPriceDetails(
          productsInRequest,
          productInfo,
        );
        const mappedOrderPriceDetailProducts =
          mappingOrderPriceDetailProducts(orderPriceDetails);

        // 4. Buatkan Order
        const order = await tx.order.create({
          data: {
            userId,
            userAddressId,
            shipping,
            storeId,
            status: 'PENDING',
            totalAmount: orderPriceDetails.totalAmount,
            products: {
              create: mappedOrderPriceDetailProducts,
            },
            transaction: {
              create: {
                paymentMethod: transaction.paymentMethod,
                status: 'PENDING',
              },
            },
          },
          include: {
            transaction: true,
          },
        });

        // 5. Cek apakah order berhasil dibuat
        if (!order) {
          throw new BadRequestCustomException(
            'something went wrong, failed to process your order',
          );
        }

        // 6. Jika order berhasil, maka kurangi value stok yang tersedia pada produk nya
        for (const product of productsInRequest) {
          await tx.product.update({
            where: { id: product.id },
            data: {
              availableStock: {
                decrement: product.quantity,
              },
            },
          });
        }

        // 7. return order result
        return order;
      });
    };

    const order = await orderTransaction();
    return order;
  }

  async findAll(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        transaction: true,
      },
    });

    type OrdersResponse = typeof orders;

    const mapOrdersResponse = (orders: OrdersResponse) => {
      return orders.map((order) => {
        const {
          userId,
          userAddressId,
          transaction: { orderId, ...restTransaction },
          ...rest
        } = order;

        return {
          ...rest,
          transaction: restTransaction,
        };
      });
    };

    const mappedOrders = mapOrdersResponse(orders);

    return mappedOrders;
  }

  async findOne(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
      include: {
        products: true,
        transaction: true,
        userAddress: true,
      },
    });

    type OrderResponse = typeof order;

    const mapOrderResponse = (order: OrderResponse) => {
      const {
        userId,
        userAddressId,
        userAddress: {
          id: idAddress,
          userId: userIdAddress,
          createdAt,
          updatedAt,
          ...restUserAddress
        },
        transaction: { orderId, ...restTransaction },
        ...rest
      } = order;

      const mappedProducts = order.products.map((product) => {
        const { id, orderId, productId, ...rest } = product;

        return {
          id: productId,
          ...rest,
        };
      });

      return {
        ...rest,
        products: mappedProducts,
        userAddress: restUserAddress,
        transaction: restTransaction,
      };
    };

    const mappedOrder = mapOrderResponse(order);

    return mappedOrder;
  }

  async cancelOrderById(orderId: string, userId: string) {
    const order = await this.findOne(orderId, userId);

    switch (order.status) {
      case 'CANCELLED':
        throw new BadRequestCustomException('your order has been cancelled');
      case 'DELIVERED':
        throw new BadRequestCustomException(
          'your order has been delivered. orders cannot be canceled',
        );
      case 'SHIPPED':
        throw new BadRequestCustomException(
          'your order has been shipped. orders cannot be canceled',
        );
      case 'PROCESSING':
        throw new BadRequestCustomException(
          'your order has been processed. orders cannot be canceled',
        );
    }

    const updatedOrder = await this.prisma.order.update({
      where: {
        id: orderId,
        userId,
      },
      data: {
        status: 'CANCELLED',
      },
    });

    return updatedOrder;
  }
}
