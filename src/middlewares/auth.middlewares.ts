import type Express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { tokenEnv } from '@/config';
import type { Request } from '@/types';
import { findUserRepository } from '@/repositories/user.repositories';
import { ApiError } from '@/helpers/api-errors';

const authMiddleware = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { token } = req.cookies;

  if (!token) throw new ApiError('Unauthorized', 401);

  try {
    verify(`${token}`, `${tokenEnv.access}`, async (error, decoded) => {
      if (error) throw new ApiError('Invalid token', 401);

      const { id } = decoded as JwtPayload;
      const user = await findUserRepository(id);

      if (!user || !user.id) throw new ApiError('Forbidden', 403);

      req.user = user;

      return next();
    });
  } catch (e) {
    next(e);
  }
};

export { authMiddleware };
