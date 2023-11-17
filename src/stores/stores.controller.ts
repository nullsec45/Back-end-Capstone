import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthenticatedRequest } from 'typings';
import { NotFoundCustomException } from 'customExceptions/NotFoundCustomException';

// BELUM MENERAPKAN AUTHORIZATION untuk create, update, delete, dll
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    const createdStore = await this.storesService.create({
      ...createStoreDto,
      userId,
    });

    return {
      data: createdStore,
    };
  }

  @Get()
  async findAll() {
    const stores = await this.storesService.findAll();

    return {
      data: stores,
      meta: {
        totalItems: stores.length,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const store = await this.storesService.findOne(id);
    if (!store) throw new NotFoundCustomException('Store not found');

    return {
      data: store,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @Req() req: AuthenticatedRequest,
  ) {
    // const userId = req.user.id; UNTUK AUTHORIZATION NANTI
    const updatedStore = await this.storesService.update(id, updateStoreDto);

    return {
      data: updatedStore,
      message: 'Store updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedStore = await this.storesService.remove(id);

    return {
      data: deletedStore,
      message: 'Store deleted successfully',
    };
  }
}
