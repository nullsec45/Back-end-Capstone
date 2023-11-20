import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcryptjs';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.findByEmail(createUserDto.email);

    if (isEmailExist) throw new ConflictCustomException('email duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
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
    console.log(id);
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
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
