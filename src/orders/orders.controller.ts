import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Req,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from '../../typings';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const createdOrder = await this.ordersService.create(
      createOrderDto,
      userId,
    );

    return {
      data: createdOrder,
      statusCode: HttpStatus.CREATED,
      message: 'order successfully created',
    };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const orders = await this.ordersService.findAll(userId);

    return {
      data: orders,
      statusCode: HttpStatus.OK,
      meta: {
        totalItems: orders.length,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') orderId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.findOne(orderId, userId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
    };
  }

  @Post(':id/cancel-order')
  @HttpCode(HttpStatus.OK)
  async cancelOrder(
    @Param('id') orderId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.cancelOrderById(orderId, userId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
      message: 'order successfully cancelled',
    };
  }
}
