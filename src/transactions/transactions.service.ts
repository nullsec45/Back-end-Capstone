import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma.service';
import { ForbiddenCustomException } from '../../customExceptions/ForbiddenCustomException';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async sendPaymentProof(
    transactionId: string,
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ) {
    const { paymentProof, transactionAmount } = createTransactionDto;

    const isAllowed = await this.checkIsUserAllowedToSend(
      transactionId,
      userId,
    );

    if (!isAllowed)
      throw new ForbiddenCustomException(
        'you are not allowed to send this payment proof',
      );

    const transaction = await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        paymentProof,
        transactionAmount,
      },
    });

    return transaction;
  }

  private async checkIsUserAllowedToSend(
    transactionId: string,
    userId: string,
  ) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      select: {
        id: true,
        order: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });

    if (transaction?.order.userId === userId) return true;

    return false;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
