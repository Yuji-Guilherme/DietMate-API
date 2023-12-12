import type Express from 'express';
import { User, Request } from '@/types';
import {
  createUserService,
  deleteUserService,
  updateUserService
} from '@/services/user.service';

const createUser = async (req: Express.Request, res: Express.Response) => {
  const { username, password }: User = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Submit all fields' });
  }

  try {
    const user = await createUserService({ username, password });

    if (!user) {
      return res.status(400).send({ message: 'Error creating user' });
    }

    res.status(201).send({
      message: 'User created successfully',
      user: { username, id: user.id }
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

const findUser = (req: Request, res: Express.Response) => {
  const { user } = req;
  return res.status(200).send({ user });
};

const updateUser = async (req: Request, res: Express.Response) => {
  const { _id } = req.user!;
  const { username, password } = req.body;

  if (!username && !password)
    return res
      .status(400)
      .send({ message: 'Submit at least one field for update' });

  try {
    await updateUserService(_id, { username, password });

    res.status(200).send({ message: 'User successfully updated' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req: Request, res: Express.Response) => {
  const { _id } = req.user!;

  try {
    await deleteUserService(_id);

    res.status(200).send({ message: 'User successfully deleted' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

export { createUser, findUser, updateUser, deleteUser };
