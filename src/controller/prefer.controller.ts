import type Express from 'express';
import { RequestWithUser } from '../types';
import {
  addPreferService,
  updatePreferService,
  deletePreferService
} from '../services/prefer.service';

const createPrefer = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.user!;
  const { preference } = req.body;

  try {
    const result = await addPreferService(id!, preference);

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

const findPrefer = (req: RequestWithUser, res: Express.Response) => {
  const { preference } = req.user!;
  return res.status(200).send({ preference });
};

const updatePrefer = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { preference } = req.body;
  const { id, preference: userPreference } = req.user!;

  try {
    const result = await updatePreferService(id!, userPreference!, preference);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const deletePrefer = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.user!;

  try {
    const result = await deletePreferService(id!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export { createPrefer, findPrefer, updatePrefer, deletePrefer };
