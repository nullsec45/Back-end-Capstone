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

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
