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
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

// BELUM MENERAPKAN AUTHORIZATION untuk create, update, delete, dll
@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    description: 'request body post store',
    type: CreateStoreDto
  })

  @ApiResponse({
    status: 201,
    description: 'store successfully created',
  })
  @ApiResponse({
    status: 409,
    description: 'store name duplicated',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data all stores'
  })

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
  @ApiResponse({
    status: 200,
    description: 'detail of store'
  })

  async findOne(@Param('id') id: string) {
    const store = await this.storesService.findOne(id);
    if (!store) throw new NotFoundCustomException('Store not found');

    return {
      data: store,
      statusCode: HttpStatus.OK,
    };
  }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({
    description: 'request body update store',
    type: CreateStoreDto
  })
  @ApiResponse({
    status: 201,
    description: 'store successfully updated'
  })

  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const updatedStore = await this.storesService.update(id, updateStoreDto);

    return {
      data: updatedStore,
      statusCode: HttpStatus.OK,
      message: 'store successfully updated',
    };
  }

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'store successfully deleted'
  })

  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    await this.storesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'store successfully deleted',
    };
  }
}
