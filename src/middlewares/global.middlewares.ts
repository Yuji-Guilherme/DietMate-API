import type Express from 'express';
import { isValidObjectId } from 'mongoose';
import { findUserService } from '@/services/user.service';
import { Request, User } from '@/types';

const validId = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) res.status(400).send({ message: 'Invalid ID' });

    next();
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

const validUser = async (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { id } = req.params;
    const user: User | null = await findUserService(id);

    if (!user) res.status(400).send({ message: 'User not found' });

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
