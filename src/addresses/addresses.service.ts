import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma.service';

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
    return await this.prisma.userAddress.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });
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

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
