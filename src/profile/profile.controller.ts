import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthenticatedRequest } from 'typings';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    const createProfile = await this.profileService.create({
      ...createProfileDto,
      userId
    });

    return {
      data: createProfile,
      statusCode: HttpStatus.CREATED,
      message: 'profile successfully created'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const dataProfile = await this.profileService.findOne(userId);

    return {
      data: dataProfile,
      statusCode: HttpStatus.OK
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req: AuthenticatedRequest, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.sub;

    const updateProfile = await this.profileService.update(userId, updateProfileDto);

    return {
      data: updateProfile,
      statusCode: HttpStatus.OK,
      message: 'review successfully update'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Req() req: AuthenticatedRequest, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.sub;

    await this.profileService.changePassword(userId, changePasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'successfully change password'
    }
  }
}
