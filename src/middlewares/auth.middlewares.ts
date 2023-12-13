import type Express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import type { Request } from '@/types';
import { findUserRepository } from '@/repositories/user.repositories';

const authMiddleware = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(401).send();

    const [bearer, token] = authorization.split(' ');

    if (!bearer || !token || bearer !== 'Bearer') return res.status(401).send();

    verify(token, `${process.env.SECRET_KEY}`, async (error, decoded) => {
      if (error) return res.status(401).send({ message: 'Invalid token' });

      const { id } = decoded as JwtPayload;
      const user = await findUserRepository(id);

      if (!user || !user.id)
        return res.status(401).send({ message: 'Invalid token' });

      req.user = user;

      return next();
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

export { authMiddleware };
