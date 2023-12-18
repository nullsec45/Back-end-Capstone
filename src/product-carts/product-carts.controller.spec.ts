import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartsController } from './product-carts.controller';
import { ProductCartsService } from './product-carts.service';

describe('ProductCartsController', () => {
  let controller: ProductCartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCartsController],
      providers: [ProductCartsService],
    }).compile();

    controller = module.get<ProductCartsController>(ProductCartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
