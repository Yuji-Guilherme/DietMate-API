import type Express from 'express';
import { User } from '@/types';

interface Request extends Express.Request {
  user?: User;
}

export { Request };
