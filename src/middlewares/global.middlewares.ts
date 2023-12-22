import type Express from 'express';
import { isValidObjectId } from 'mongoose';
import { invalidId } from '@/constants/errors';
import { ApiError } from '@/helpers/api-errors';

const validId = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || req.path.replace(RegExp('/', 'g'), '');

  if (!isValidObjectId(id)) throw new ApiError(invalidId);

  next();
};

export { validId };
