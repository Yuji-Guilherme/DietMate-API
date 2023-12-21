import type Express from 'express';
import { loginService } from '@/services/auth.service';

const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { username, password } = req.body;

  try {
    const token = await loginService({ username, password });

    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 86400 });
    res.status(200).send({ message: 'User logged in successfully' });
  } catch (e) {
    next(e);
  }
};

export { login };
