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
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('profiles')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @ApiBody({
    description: 'request body post profile',
    type: CreateProfileDto
  })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'profile successfully created',
  })
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

  @Get('me')
  @ApiResponse({
    status: 201,
    description: 'detail profile',
  })
  async findOne(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const dataProfile = await this.profileService.findOne(userId);

    return {
      data: dataProfile,
      statusCode: HttpStatus.OK
    }
  }

  @ApiBody({
    description: 'request body patch profile',
    type: CreateProfileDto
  })
  @Patch()
  @ApiResponse({
    status: 409,
    description: 'profile <user_id> not found',
  })
  @ApiResponse({
    status: 200,
    description: 'profile successfully update',
  })
  async update(@Req() req: AuthenticatedRequest, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.sub;

    const updateProfile = await this.profileService.update(userId, updateProfileDto);

    return {
      data: updateProfile,
      statusCode: HttpStatus.OK,
      message: 'profile successfully update'
    }
  }

  @ApiBody({
    description: 'request body change password',
    type: ChangePasswordDto
  })
  @Patch('change-password')
  @ApiResponse({
    status: 200,
    description: 'successfully change password',
  })
  @ApiResponse({
    status: 409,
    description: 'fail change password: please confirm the password again',
  })
  async changePassword(@Req() req: AuthenticatedRequest, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.sub;

    await this.profileService.changePassword(userId, changePasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'successfully change password'
    }
  }
}
