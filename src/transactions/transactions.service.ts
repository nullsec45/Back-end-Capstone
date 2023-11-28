import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
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

    const isAllowed = await this.checkIsUserAllowedToSendPaymentProof(
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

  async approvePayment(transactionId: string, userId: string) {
    const isAllowed = await this.checkIsOwnerAllowedToChangeTransactionStatus(
      transactionId,
      userId,
    );

    if (!isAllowed)
      throw new ForbiddenCustomException(
        'you are not allowed to approve this payment proof. you are not the owner of this store',
      );

    this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: 'APPROVED',
      },
    });
  }

  async rejectPayment(transactionId: string, userId: string) {
    const isAllowed = await this.checkIsOwnerAllowedToChangeTransactionStatus(
      transactionId,
      userId,
    );

    if (!isAllowed)
      throw new ForbiddenCustomException(
        'you are not allowed to reject this payment proof. you are not the owner of this store',
      );

    this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: 'REJECTED',
      },
    });
  }

  private async checkIsUserAllowedToSendPaymentProof(
    transactionId: string,
    userId: string,
  ) {
    const transaction = await this.findOne(transactionId);
    if (transaction?.order.userId === userId) return true;
    return false;
  }

  private async checkIsOwnerAllowedToChangeTransactionStatus(
    transactionId: string,
    userId: string,
  ) {
    const transaction = await this.findOne(transactionId);
    if (transaction?.order.store.userId === userId) return true;
    return false;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        order: {
          select: {
            id: true,
            userId: true,
            store: {
              select: {
                id: true,
                userId: true,
              },
            },
          },
        },
      },
    });

    return transaction;
  }
}
