import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    const accessToken = await this.authService.login(req.user);

    return {
      data: {
        accessToken,
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
