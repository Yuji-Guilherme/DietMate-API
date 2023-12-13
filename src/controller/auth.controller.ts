import type Express from 'express';
import { loginService } from '@/services/auth.service';

const login = async (req: Express.Request, res: Express.Response) => {
  const { username, password } = req.body;
  const token = await loginService({ username, password });

  res.status(200).send({ token });
};

export { login };
