import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartsService } from './product-carts.service';

describe('ProductCartsService', () => {
  let service: ProductCartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCartsService],
    }).compile();

    service = module.get<ProductCartsService>(ProductCartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
