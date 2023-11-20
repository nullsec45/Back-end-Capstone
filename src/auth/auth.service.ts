import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../typings';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, createdAt, updatedAt, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
