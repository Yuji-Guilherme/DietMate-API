import type Express from 'express';
import { Types } from 'mongoose';
import type { Request } from '@/types';
import { addDietService } from '@/services/diet.service';

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

  try {
    const oldUserDiet = userDiets || {};
    const dietId = new Types.ObjectId().toString();

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

export { findDiet, addDiet };
