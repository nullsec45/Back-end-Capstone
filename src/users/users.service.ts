import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcryptjs';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private storesService: StoresService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.findByEmail(createUserDto.email);
    const isUsernameExist = await this.findByUsername(createUserDto.username);

    if (isEmailExist) throw new ConflictCustomException('email duplicated');
    if (isUsernameExist)
      throw new ConflictCustomException('username duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    // Buatkan user cart secara otomatis
    await this.prisma.cart.create({
      data: {
        userId: newUser.id,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = newUser;

    return data;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const { password, ...data } = user;

    if (user) {
      return {
        data,
        statusCode: 200,
      };
    }

    throw new NotFoundException('Data user tidak ditemukan');
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getMyStore(userId: string) {
    return await this.storesService.findByUserId(userId);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
