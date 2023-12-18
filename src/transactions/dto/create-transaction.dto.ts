import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: '"<photo_url_of_proof_of_payment>',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  paymentProof: string;

  @ApiProperty({
    example: 5500000,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  transactionAmount: number;
}
