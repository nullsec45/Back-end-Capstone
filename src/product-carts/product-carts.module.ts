import { Module } from '@nestjs/common';
import { ProductCartsService } from './product-carts.service';
import { ProductCartsController } from './product-carts.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductCartsController],
  providers: [ProductCartsService, PrismaService],
})
export class ProductCartsModule { }
