import { Request } from 'express';

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthenticatedRequest = Request & {
  user?: {
    sub: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
  };
};
