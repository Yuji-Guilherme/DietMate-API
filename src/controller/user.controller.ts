import type Express from 'express';
import { Types } from 'mongoose';
import { User, Request } from '@/types';
import {
  createService,
  findDietService,
  addDietService
} from '@/services/user.service';

const create = async (req: Express.Request, res: Express.Response) => {
  try {
    const { username, password }: User = req.body;

    if (!username || !password) {
      res.status(400).send({ message: 'Submit all fields' });
    }

    const user = await createService({ username, password });

    if (!user) {
      res.status(400).send({ message: 'Error creating user' });
    }

    res.status(201).send({
      message: 'User created successfully',
      user: { username, id: user.id }
    });
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

const findUser = async (req: Request, res: Express.Response) => {
  const { user } = req;
  res.status(200).send(user);
};

const findDiet = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;

  const diets = await findDietService(id);

  if (!diets?.diet) {
    res.status(204).send();
  }

  res.status(200).send({
    diet: diets?.diet
  });
};

const addDiet = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { diet } = req.body;

  const dietId = new Types.ObjectId().toString();
  const oldUserDiet = (await findDietService(id))?.diet || {};

  const userDiet = await addDietService(id, diet, dietId, oldUserDiet);

  res.status(201).send({
    message: 'Diet created successfully',
    diet: userDiet.diet
  });
};

export { create, findUser, findDiet, addDiet };
