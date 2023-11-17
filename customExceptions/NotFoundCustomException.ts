import { NotFoundException, HttpStatus } from '@nestjs/common';

export class NotFoundCustomException extends NotFoundException {
  constructor(message: string) {
    super({
      error: {
        code: HttpStatus.NOT_FOUND,
        message,
      },
      success: false,
    });
  }
}
