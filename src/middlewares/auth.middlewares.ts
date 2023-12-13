import type Express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import type { Request } from '@/types';
import { findUserRepository } from '@/repositories/user.repositories';
import { ApiError } from '@/helpers/api-errors';

const authMiddleware = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) throw new ApiError('Unauthorized', 401);

  const [bearer, token] = authorization.split(' ');

  if (!bearer || !token || bearer !== 'Bearer')
    throw new ApiError('Unauthorized', 401);

  try {
    verify(token, `${process.env.SECRET_KEY}`, async (error, decoded) => {
      if (error) throw new ApiError('Invalid token', 401);

      const { id } = decoded as JwtPayload;
      const user = await findUserRepository(id);

      if (!user || !user.id) throw new ApiError('Invalid token', 401);

      req.user = user;

      return next();
    });
  } catch (e) {
    next(e);
  }
};

export { authMiddleware };
