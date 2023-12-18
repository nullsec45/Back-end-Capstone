import { HttpStatus, ConflictException } from '@nestjs/common';

export class ConflictCustomException extends ConflictException {
  constructor(message: string) {
    super({
      error: {
        message,
      },
      statusCode: HttpStatus.CONFLICT,
      success: false,
    });
  }
}
