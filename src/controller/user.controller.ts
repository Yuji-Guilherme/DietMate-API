import type Express from 'express';
import { User, Request } from '@/types';
import {
  createUserService,
  updateUserService,
  deleteUserService
} from '@/services/user.service';

const createUser = async (req: Express.Request, res: Express.Response) => {
  const { username, password }: User = req.body;

  const result = await createUserService({ username, password });

  res.status(201).send(result);
};

const findUser = (req: Request, res: Express.Response) => {
  const { user } = req;
  return res.status(200).send({ user });
};

const updateUser = async (req: Request, res: Express.Response) => {
  const { _id } = req.user!;
  const { username, password } = req.body;

  const result = await updateUserService(_id, { username, password });

  res.status(200).send(result);
};

const deleteUser = async (req: Request, res: Express.Response) => {
  const { _id } = req.user!;

  const result = await deleteUserService(_id);

  res.status(200).send(result);
};

export { createUser, findUser, updateUser, deleteUser };
