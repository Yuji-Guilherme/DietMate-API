import type Express from 'express';
import type { Request } from '@/types';
import {
  addDietService,
  deleteAllDietService,
  updateDietService,
  deleteOneDietService
} from '@/services/diet.service';

const findAllDiet = async (req: Request, res: Express.Response) => {
  const { user } = req;

  res.status(200).send({
    diet: user!.diet
  });
};

const deleteAllDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.user!;
  const result = await deleteAllDietService(id!);

  res.status(200).send(result);
};

const addDiet = async (req: Request, res: Express.Response) => {
  const { id, diet: userDiets } = req.user!;
  const { diet } = req.body;

  const result = await addDietService(id!, diet, userDiets);

  return res.status(201).send(result);
};

const findOneDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { user } = req;

  res.status(200).send({
    diet: user!.diet![id]
  });
};

const updateDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { diet } = req.body;
  const { id: userId, diet: userDiet } = req.user!;

  const result = await updateDietService(id, userId!, diet, userDiet);

  res.status(200).send(result);
};

const deleteOneDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { id: userId, diet: userDiet } = req.user!;

  const result = await deleteOneDietService(id, userId!, userDiet!);

  res.status(200).send(result);
};

export {
  findAllDiet,
  deleteAllDiet,
  addDiet,
  findOneDiet,
  updateDiet,
  deleteOneDiet
};
