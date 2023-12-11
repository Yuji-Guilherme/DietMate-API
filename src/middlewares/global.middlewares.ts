import type Express from 'express';
import { isValidObjectId } from 'mongoose';
import { findUserService } from '@/services/user.service';
import { Request, User } from '@/types';

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

const validUser = async (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;

  try {
    const user: User | null = await findUserService(id);

    if (!user) return res.status(404).send({ message: 'User not found' });

    req.user = user!;

    next();
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { validId, validUser };
