import type Express from 'express';
import { Types } from 'mongoose';
import { findDietService, addDietService } from '@/services/diet.service';

const findDiet = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;

  try {
    const diets = await findDietService(id);

    if (!diets?.diet) {
      return res.status(204).send();
    }

    res.status(200).send({
      diet: diets?.diet
    });
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

const addDiet = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { diet } = req.body;

  try {
    const oldUserDiet = (await findDietService(id))?.diet || {};
    const dietId = new Types.ObjectId().toString();

    const userDiet = await addDietService(id, diet, dietId, oldUserDiet);

    return res.status(201).send({
      message: 'Diet created successfully',
      diet: userDiet.diet
    });
  } catch (error) {
    if (error) {
      const err = error as Error;
      return res.status(500).send({ message: err.message });
    }
  }
};

export { findDiet, addDiet };
