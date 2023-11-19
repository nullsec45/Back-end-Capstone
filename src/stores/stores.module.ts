import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { PrismaService } from 'src/prisma.service';
import { MockJwtMiddleware } from '../mockJwt.middleware';

@Module({
  controllers: [StoresController],
  providers: [StoresService, PrismaService],
})
export class StoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockJwtMiddleware).forRoutes(StoresController);
  }
}
