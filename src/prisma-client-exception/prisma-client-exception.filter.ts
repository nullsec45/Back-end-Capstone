import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          error: {
            message: 'there is a duplicated field',
            detail: message,
          },
          statusCode: HttpStatus.CONFLICT,
          success: false,
        });
        break;
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          error: {
            message,
          },
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
        });
      default:
        super.catch(exception, host);
        break;
    }
  }
}
