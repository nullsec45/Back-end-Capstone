import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByEmail(authDto.email);

    if (user && (await compare(authDto.password, user.password))) {
      const { password, ...result } = user;
      const payload = { sub: result.id, username: result.email };
      return {
        data: {
          access_token: await this.jwtService.signAsync(payload, {
            secret: 'FajarGanteng77_',
            expiresIn: '1H',
          }),
        },
        statusCode: 200,
        message: 'Login Successfully',
      };
    }
  }
}
