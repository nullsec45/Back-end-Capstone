import { NotFoundException, HttpStatus } from '@nestjs/common';

export class NotFoundCustomException extends NotFoundException {
  constructor(message: string) {
    super({
      error: {
        message,
      },
      statusCode: HttpStatus.NOT_FOUND,
      success: false,
    });
  }
}
