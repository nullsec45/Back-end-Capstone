import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: AuthDto,
    description: 'request body for auth login',
  })

  @ApiResponse({
    status: 201,
    description: 'login sucessfully',
  })

  @ApiResponse({
    status: 401,
    description: 'invalid credentials'
  })
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

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'token valid' })
  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  async verifyToken(@Req() req: any) {
    return {
      data: req.user,
      statusCode: HttpStatus.OK,
      message: 'token valid',
    };
  }

  @ApiBody({
    type: CreateUserDto,
    description: 'request body for auth register',
  })

  @ApiResponse({
    status: 201,
    description: 'user sucessfully registerd',
  })

  @ApiResponse({
    status: 409,
    description: 'email duplicated',
  })

  @ApiResponse({
    status: 409,
    description: 'username duplicated',
  })
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
