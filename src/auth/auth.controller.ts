import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/users.service';
import { AuthenticatedRequest } from '../../typings';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthenticatedRequest) {
    const access_token = await this.authService.login(req.user);

    return {
      data: {
        access_token,
      },
      statusCode: HttpStatus.OK,
      message: 'login successfully',
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    return {
      data: newUser,
      statusCode: HttpStatus.CREATED,
      message: 'user successfully registered',
    };
  }
}
