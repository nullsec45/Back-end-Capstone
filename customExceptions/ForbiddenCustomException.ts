import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenCustomException extends HttpException {
  constructor(message: string) {
    super(
      {
        error: {
          message,
        },
        statusCode: HttpStatus.FORBIDDEN,
        success: false,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
