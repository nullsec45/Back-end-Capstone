import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from '../../typings';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':id/payment-proof')
  @HttpCode(HttpStatus.OK)
  async sendPaymentProof(
    @Param('id') transactionId: string,
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const transaction = await this.transactionsService.sendPaymentProof(
      transactionId,
      createTransactionDto,
      userId,
    );

    return {
      data: transaction,
      statusCode: HttpStatus.OK,
      message:
        'payment proof successfully sent. please wait for confirmation from the store owner',
    };
  }

  @Post(':id/approve-payment')
  @HttpCode(HttpStatus.OK)
  async approvePayment(
    @Param('id') transactionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const transaction = await this.transactionsService.approvePayment(
      transactionId,
      userId,
    );

    return {
      data: transaction,
      statusCode: HttpStatus.OK,
      message: 'payment is approved. please process the product to be shipped',
    };
  }

  @Post(':id/reject-payment')
  @HttpCode(HttpStatus.OK)
  async rejectPayment(
    @Param('id') transactionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const transaction = await this.transactionsService.rejectPayment(
      transactionId,
      userId,
    );

    return {
      data: transaction,
      statusCode: HttpStatus.OK,
      message:
        'payment is rejected. please give the user a reason why the payment was rejected',
    };
  }
}
