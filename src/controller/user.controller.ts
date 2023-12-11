import type Express from 'express';
import { User, Request } from '@/types';
import { createUserService, updateUserService } from '@/services/user.service';

const createUser = async (req: Express.Request, res: Express.Response) => {
  const { username, password }: User = req.body;

  if (!username || !password) {
    res.status(400).send({ message: 'Submit all fields' });
  }

  try {
    const user = await createUserService({ username, password });

    if (!user) {
      res.status(400).send({ message: 'Error creating user' });
    }

    res.status(201).send({
      message: 'User created successfully',
      user: { username, id: user.id }
    });
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

const findUser = (req: Request, res: Express.Response) => {
  const { user } = req;
  res.status(200).send(user);
};

const updateUser = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!username && !password)
    res.status(400).send({ message: 'Submit at least one field for update' });

  try {
    await updateUserService(id, { username, password });

    res.status(200).send({ message: 'User successfully updated' });
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { createUser, findUser, updateUser };
