import type Express from 'express';
import { compare } from 'bcryptjs';
import { loginService } from '@/services/auth.service';

const login = async (req: Express.Request, res: Express.Response) => {
  try {
    const { username, password } = req.body;

    const user = await loginService(username);

    if (!user)
      return res.status(400).send({ message: 'Incorrect user or password ' });

    const isValidPassword = await compare(password, user!.password);

    if (!isValidPassword)
      return res.status(400).send({ message: 'Incorrect user or password ' });

    res.status(200).send();
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { login };
