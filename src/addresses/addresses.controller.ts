import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from '../../typings';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const createdAddress = await this.addressesService.create(
      createAddressDto,
      userId,
    );

    return {
      data: createdAddress,
      statusCode: HttpStatus.CREATED,
      message: 'address successfully created',
    };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const addresses = await this.addressesService.findAll(userId);

    return {
      data: addresses,
      statusCode: HttpStatus.OK,
      meta: {
        totalItems: addresses.length,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') addressId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const address = await this.addressesService.findOne(addressId, userId);

    return {
      data: address,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const updatedAddress = await this.addressesService.update(
      addressId,
      updateAddressDto,
      userId,
    );

    return {
      data: updatedAddress,
      statusCode: HttpStatus.OK,
      message: 'address successfully updated',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
