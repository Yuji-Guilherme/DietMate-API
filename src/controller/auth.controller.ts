import type Express from 'express';
import { cookieAccessTokenConfig } from '@/constants/token';
import { loginService } from '@/services/auth.service';

const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { username, password } = req.body;

  try {
    const token = await loginService({ username, password });

    res.cookie('token', token, cookieAccessTokenConfig);
    res.status(200).send({ message: 'User logged in successfully' });
  } catch (e) {
    next(e);
  }
};

export { login };
