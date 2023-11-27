import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

describe('StoresController', () => {
  let storesController: StoresController;
  let storesService: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [StoresService],
    }).compile();

    storesController = module.get<StoresController>(StoresController);
    storesService = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(storesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stores', () => {
      const result = [
        {
          id: '1',
          userId: '1',
          name: 'mytoko1',
          description: 'mytoko1 description',
          profilePicture: 'url_picture',
          status: true,
          verfied: false,
          createdAt: '2023-11-16T12:34:35.298Z',
          updatedAt: '2023-11-16T12:34:35.298Z',
        },
      ];

      // jest.spyOn(storesService, 'findAll').mockImplementation(() => Promise.resolve(result));
    });
  });
});
