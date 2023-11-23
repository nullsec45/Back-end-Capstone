import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma.service';
import { ForbiddenCustomException } from '../../customExceptions/ForbiddenCustomException';
import { NotFoundCustomException } from '../../customExceptions/NotFoundCustomException';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    const {
      city,
      district,
      latitude,
      longitude,
      fullAddress,
      postalCode,
      province,
    } = createAddressDto;

    return await this.prisma.userAddress.create({
      data: {
        userId,
        province,
        city,
        district,
        fullAddress,
        postalCode,
        latitude,
        longitude,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.userAddress.findMany({
      where: { userId },
    });
  }

  async findOne(addressId: string, userId: string) {
    const address = await this.prisma.userAddress.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) throw new NotFoundCustomException('address not found');

    return address;
  }

  async update(
    addressId: string,
    updateAddressDto: UpdateAddressDto,
    userId: string,
  ) {
    const {
      city,
      district,
      latitude,
      longitude,
      fullAddress,
      postalCode,
      province,
    } = updateAddressDto;
    const isAllowed = await this.checkIsUserAllowedToModify(addressId, userId);
    if (!isAllowed)
      throw new ForbiddenCustomException(
        'you are not allowed to edit this data',
      );

    return await this.prisma.userAddress.update({
      where: {
        id: addressId,
      },
      data: {
        province,
        city,
        district,
        fullAddress,
        postalCode,
        latitude,
        longitude,
      },
    });
  }

  async remove(addressId: string, userId: string) {
    const isAllowed = await this.checkIsUserAllowedToModify(addressId, userId);
    if (!isAllowed)
      throw new ForbiddenCustomException(
        'you are not allowed to delete this data',
      );

    return await this.prisma.userAddress.delete({
      where: {
        id: addressId,
      },
    });
  }

  private async checkIsUserAllowedToModify(addressId: string, userId: string) {
    const address = await this.prisma.userAddress.findUnique({
      where: { id: addressId },
      select: {
        id: true,
        userId: true,
      },
    });

    // jika address dengan id tersebut tidak ditemukan
    if (!address) throw new NotFoundCustomException('address not found');

    // jika address tersebut bukan milik dari user yang terautentikasi, maka jangan ijinkan untuk modifikasi data
    if (address?.userId === userId) return true;

    return false;
  }
}
