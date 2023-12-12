import type Express from 'express';
import { Types } from 'mongoose';
import type { Request } from '@/types';
import { addDietService, deleteDietService } from '@/services/diet.service';

const findDiet = async (req: Request, res: Express.Response) => {
  const { user } = req;

  if (!user?.diet) {
    return res.status(204).send();
  }

  res.status(200).send({
    diet: user.diet
  });
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
    return res.status(500).send({ message: err.message });
  }
};

const deleteDiet = async (req: Request, res: Express.Response) => {
  const { id } = req.user!;

  try {
    await deleteDietService(id!);

    res.status(200).send({ message: 'Diets successfully deleted' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).send({ message: err.message });
  }
};

export { findDiet, addDiet, deleteDiet };
