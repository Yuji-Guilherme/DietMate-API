import type Express from 'express';
import type { Types } from 'mongoose';
import type { User } from '@/types';

interface UserWithId extends User {
  _id: Types.ObjectId;
  id?: string;
}

interface RequestWithUser extends Express.Request {
  user?: UserWithId;
}

interface RequestWithId extends Express.Request {
  id?: string;
}

export { RequestWithUser, RequestWithId };
