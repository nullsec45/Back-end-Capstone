import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(): Promise<any> {
    const user = await this.prisma.user.create({
      data: {
        email: 'rizki@gmail',
        password: 'rizki',
        username: 'rizki',
      },
    });

    return user;
  }
}
