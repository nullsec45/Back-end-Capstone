import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { MockJwtMiddleware } from '../mockJwt.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockJwtMiddleware).forRoutes(ProductsController);
  }
}
