import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PrismaService } from '../prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProfileDto: CreateProfileDto) {
    const {
      userId,
      fullname,
      profilePicture,
      gender,
      dateOfbirth,
      phoneNumber,
    } = createProfileDto;

    const iso8601Date = new Date(dateOfbirth).toISOString();

    return await this.prisma.profile.create({
      data: {
        userId,
        fullname,
        profilePicture,
        gender,
        dateOfbirth: iso8601Date,
        phoneNumber,
      },
    });
  }

  async findOne(userId: string) {
    const dataProfile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    return dataProfile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const dataProfile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (dataProfile == null) {
      throw new ConflictCustomException(`profile ${userId} not found`);
    } else {
      const { dateOfbirth, ...profile } = updateProfileDto;
      const iso8601Date = new Date(dateOfbirth).toISOString();

      return await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          ...profile,
          dateOfbirth: iso8601Date,
        },
      });
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;

    const selectOldPassword = await this.prisma.user.findFirst({
      select: {
        password: true,
      },
      where: {
        id: userId,
      },
    });

    if (await compare(oldPassword, selectOldPassword.password)) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: await hash(newPassword, 10),
        },
      });
    } else {
      throw new ConflictCustomException(
        'fail change password: please confirm the password again',
      );
    }
  }
}
