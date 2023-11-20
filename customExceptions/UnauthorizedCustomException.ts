import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class UnauthorizedCustomException extends UnauthorizedException {
  constructor(message: string) {
    super({
      error: {
        message,
      },
      statusCode: HttpStatus.UNAUTHORIZED,
      success: false,
    });
  }
}
