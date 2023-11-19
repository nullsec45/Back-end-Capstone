import { Request } from 'express';

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
  };
};
