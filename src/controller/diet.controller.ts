import type Express from 'express';
import type { RequestWithUser } from '../types';
import {
  addDietService,
  deleteAllDietService,
  updateDietService,
  deleteOneDietService
} from '../services/diet.service';

const findAllDiet = async (req: RequestWithUser, res: Express.Response) => {
  const { diet } = req.user!;

  res.status(200).send({
    diet
  });
};

const deleteAllDiet = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.user!;

  try {
    const result = await deleteAllDietService(id!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const addDiet = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id, diet: userDiets } = req.user!;
  const { diet } = req.body;

  try {
    const result = await addDietService(id!, diet, userDiets);

    return res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

const findOneDiet = async (req: RequestWithUser, res: Express.Response) => {
  const { id } = req.params;
  const { user } = req;

  res.status(200).send({
    diet: user!.diet![id]
  });
};

const updateDiet = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { diet } = req.body;
  const { id: userId, diet: userDiet } = req.user!;

  try {
    const result = await updateDietService(id, userId!, diet, userDiet);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const deleteOneDiet = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { id: userId, diet: userDiet } = req.user!;

  try {
    const result = await deleteOneDietService(id, userId!, userDiet!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export {
  findAllDiet,
  deleteAllDiet,
  addDiet,
  findOneDiet,
  updateDiet,
  deleteOneDiet
};
