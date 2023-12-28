import type Express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { tokenEnv } from '@/config';
import { unauthorized, forbidden, authError } from '@/constants/errors';
import type { RequestWithUser, RequestWithId } from '@/types';
import { findUserRepository } from '@/repositories/user.repositories';
import { ApiError } from '@/helpers/api-errors';

const authMiddleware = (
  req: RequestWithUser,
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

const validRefreshToken = (
  req: RequestWithId,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const refreshToken = req.signedCookies.refresh;

  if (!refreshToken) throw new ApiError(unauthorized);

  try {
    verify(`${refreshToken}`, `${tokenEnv.refresh}`, async (error, decoded) => {
      if (error) throw new ApiError(authError.invalidToken);

      const { id } = decoded as JwtPayload;

      if (!id) throw new ApiError(authError.invalidToken);

      req.id = id;

      return next();
    });
  } catch (e) {
    next(e);
  }
};

export { authMiddleware, validRefreshToken };
