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
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('addresses')
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @ApiBody({
    description: 'request body post address',
    type: CreateAddressDto
  })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'address successfully created',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data all address by user',
  })
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
  @ApiResponse({
    status: 200,
    description: 'data detail address by user',
  })
  @ApiResponse({
    status: 404,
    description: 'address not found',
  })
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

  @ApiBody({
    description: 'request body patch address',
    type: CreateAddressDto
  })
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'address successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'you are not allowed to delete this data',
  })
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
  @ApiResponse({
    status: 200,
    description: 'address successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'address not found',
  })
  async remove(
    @Param('id') addressId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    await this.addressesService.remove(addressId, userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'address successfully deleted',
    };
  }
}
