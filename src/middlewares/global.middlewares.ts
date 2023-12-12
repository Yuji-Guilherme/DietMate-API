import type Express from 'express';
import { isValidObjectId } from 'mongoose';

const validId = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ message: 'Invalid ID' });

  next();
};

export { validId };
