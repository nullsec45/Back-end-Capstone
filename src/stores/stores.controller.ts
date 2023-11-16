import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthenticatedRequest } from 'typings';
import { HttpCustomException } from 'customExceptions/HttpCustomException';

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
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
