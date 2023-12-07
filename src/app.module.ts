import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AddressesModule } from './addresses/addresses.module';
import { ProfileModule } from './profile/profile.module';
import { ProductReviewModule } from './product-review/product-review.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StoresModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    TransactionsModule,
    AddressesModule,
    ProfileModule,
    ProductReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
