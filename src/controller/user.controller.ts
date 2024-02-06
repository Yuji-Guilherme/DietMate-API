import type Express from 'express';
import { User, RequestWithUser } from '../types';
import {
  createUserService,
  updateUserService,
  deleteUserService
} from '../services/user.service';

const createUser = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { username, password }: User = req.body;

  try {
    const result = await createUserService({ username, password });

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

const findUser = (req: RequestWithUser, res: Express.Response) => {
  const { user } = req;
  return res.status(200).send({ user });
};

const updateUser = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { _id } = req.user!;
  const { username, password } = req.body;

  try {
    const result = await updateUserService(_id, { username, password });

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { _id } = req.user!;

  try {
    const result = await deleteUserService(_id);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export { createUser, findUser, updateUser, deleteUser };
