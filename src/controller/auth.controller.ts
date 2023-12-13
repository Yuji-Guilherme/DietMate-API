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

    res.status(200).send({ token });
  } catch (e) {
    next(e);
  }
};

export { login };
