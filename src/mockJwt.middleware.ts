import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../typings';

@Injectable()
export class MockJwtMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    req.user = {
      id: '08dc9c4b-85ca-4fd6-a042-58383a49f845',
      email: 'rizki@gmail.com',
      username: 'rizki',
    };
    next();
  }
}
