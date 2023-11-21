import { HttpStatus, BadRequestException } from '@nestjs/common';

export class BadRequestCustomException extends BadRequestException {
  constructor(message: string) {
    super({
      error: {
        message,
      },
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
    });
  }
}
