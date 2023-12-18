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
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('orders')
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiBody({
    description: 'request body post order product',
    type: CreateOrderDto
  })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'order successfully created',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data all orders',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data detail order',
  })
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

  @Post(':id/process-order')
  @ApiResponse({
    status: 200,
    description: 'order successfully processed',
  })
  @HttpCode(HttpStatus.OK)
  async processOrder(
    @Param('id') orderId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.processOrderById(orderId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
      message: 'order successfully processed',
    };
  }

  @Post(':id/shipped-order')
  @ApiResponse({
    status: 200,
    description: 'order successfully shipped',
  })
  @HttpCode(HttpStatus.OK)
  async shippedOrder(
    @Param('id') orderId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.shippedOrderById(orderId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
      message: 'order successfully shipped',
    };
  }

  @Post(':id/delivered-order')
  @ApiResponse({
    status: 200,
    description: 'order successfully delivered',
  })
  @HttpCode(HttpStatus.OK)
  async deliveredOrder(
    @Param('id') orderId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.deliveredOrderById(orderId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
      message: 'order successfully delivered',
    };
  }

  @Post(':id/cancel-order')
  @ApiResponse({
    status: 200,
    description: 'order successfully cancelled',
  })
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

  @Post(':id/return-order')
  @ApiResponse({
    status: 200,
    description: 'order successfully returned',
  })
  @HttpCode(HttpStatus.OK)
  async returnOrder(@Param('id') orderId: string) {
    const order = await this.ordersService.returnOrderById(orderId);

    return {
      data: order,
      statusCode: HttpStatus.OK,
      message: 'order successfully returned',
    };
  }
}
