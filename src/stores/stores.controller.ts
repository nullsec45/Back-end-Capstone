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
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthenticatedRequest } from 'typings';
import { NotFoundCustomException } from 'customExceptions/NotFoundCustomException';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

// BELUM MENERAPKAN AUTHORIZATION untuk create, update, delete, dll
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const createdStore = await this.storesService.create({
      ...createStoreDto,
      userId,
    });

    return {
      data: createdStore,
      statusCode: HttpStatus.CREATED,
      message: 'store successfully created',
    };
  }

  @Get()
  async findAll() {
    const stores = await this.storesService.findAll();

    return {
      data: stores,
      statusCode: HttpStatus.OK,
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
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const updatedStore = await this.storesService.update(id, updateStoreDto);

    return {
      data: updatedStore,
      statusCode: HttpStatus.OK,
      message: 'store successfully updated',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    await this.storesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'store successfully deleted',
    };
  }
}
