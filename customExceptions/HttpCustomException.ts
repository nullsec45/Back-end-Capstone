import { HttpException } from '@nestjs/common';

export class HttpCustomException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(
      {
        error: {
          code: statusCode,
          message,
        },
        success: false,
      },
      statusCode,
    );
  }
}
