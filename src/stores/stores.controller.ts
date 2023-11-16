import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthenticatedRequest } from 'typings';
import { HttpCustomException } from 'customExceptions/HttpCustomException';

// BELUM MENERAPKAN AUTHORIZATION untuk create, update, delete, dll
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return this.storesService.create({ ...createStoreDto, userId });
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
    if (!store)
      throw new HttpCustomException('Store not found', HttpStatus.NOT_FOUND);

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

    if (!updatedStore)
      throw new HttpCustomException('Store not found', HttpStatus.NOT_FOUND);

    return {
      data: updatedStore,
      message: 'Store updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedStore = await this.storesService.remove(id);

    if (!deletedStore)
      throw new HttpCustomException('Store not found', HttpStatus.NOT_FOUND);

    return {
      data: deletedStore,
      message: 'Store deleted successfully',
    };
  }
}
