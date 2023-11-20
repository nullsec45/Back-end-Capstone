import { Request } from 'express';

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthenticatedRequest = Request & {
  user?: User;
};
