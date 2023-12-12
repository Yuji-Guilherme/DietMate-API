import type Express from 'express';
import { Types } from 'mongoose';
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

  try {
    await deleteAllDietService(id!);

    res.status(200).send({ message: 'Diets successfully deleted' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).send({ message: err.message });
  }
};

const addDiet = async (req: Request, res: Express.Response) => {
  const { id, diet: userDiets } = req.user!;
  const { diet } = req.body;

  const oldUserDiet = userDiets || {};
  const dietId = new Types.ObjectId().toString();

  try {
    const userDiet = await addDietService(id!, diet, dietId, oldUserDiet);

    return res.status(201).send({
      message: 'Diet created successfully',
      diet: userDiet.diet![dietId]
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
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

  try {
    await updateDietService(userId!, diet, id, userDiet!);

    res.status(200).send({ message: 'Diet successfully updated' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

const deleteOneDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { id: userId, diet: userDiet } = req.user!;

  delete userDiet![id];

  try {
    await deleteOneDietService(userId!, userDiet!);

    res.status(200).send({ message: 'Diet successfully deleted' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
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
