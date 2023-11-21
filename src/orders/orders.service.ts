/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';
import { ProductsService } from '../products/products.service';
import { calculateOrderPriceDetails } from './utils';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const {
      products: productsInRequest,
      shipping,
      transaction,
      userAddressId,
    } = createOrderDto;

    const productInfo = await this.productsService.findManyById(
      productsInRequest.map((product) => product.id),
    );

    const orderPriceDetails = calculateOrderPriceDetails(
      productsInRequest,
      productInfo,
    );

    // variabel mappedOrderPriceDetailProducts untuk dikirim ke tabel OrderDetail di database agar sesuai aturan schema Prisma
    const mappedOrderPriceDetailProducts = orderPriceDetails.products.map(
      (product) => ({
        quantity: product.quantity,
        rentPeriod: product.rentPeriod,
        price: product.price,
        subTotal: product.subTotal,
        product: {
          connect: {
            id: product.id,
          },
        },
      }),
    );

    return await this.prisma.order.create({
      data: {
        userId,
        userAddressId,
        shipping,
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
    });
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
          transaction: { id: idTransaction, orderId, ...restTransaction },
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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
