import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  paymentProof: string;

  @IsNotEmpty()
  @IsNumber()
  transactionAmount: number;
}
