import type Express from 'express';
import { ApiError } from '@/helpers/api-errors';
import { isValidObjectId } from 'mongoose';

const validId = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || req.path.replace(RegExp('/', 'g'), '');

  if (!isValidObjectId(id)) throw new ApiError('Invalid ID', 400);

  next();
};

export { validId };
