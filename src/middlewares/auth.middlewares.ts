import type Express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { tokenEnv } from '@/config';
import { unauthorized, forbidden, authError } from '@/constants/errors';
import type { Request } from '@/types';
import { findUserRepository } from '@/repositories/user.repositories';
import { ApiError } from '@/helpers/api-errors';

const authMiddleware = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { token } = req.cookies;

  if (!token) throw new ApiError(unauthorized);

  try {
    verify(`${token}`, `${tokenEnv.access}`, async (error, decoded) => {
      if (error) throw new ApiError(authError.invalidToken);

      const { id } = decoded as JwtPayload;
      const user = await findUserRepository(id);

      if (!user || !user.id) throw new ApiError(forbidden);

      req.user = user;

      return next();
    });
  } catch (e) {
    next(e);
  }
};

export { authMiddleware };
