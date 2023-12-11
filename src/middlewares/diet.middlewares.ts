import type Express from 'express';
import { UserFood } from '@/types';

const validDiet = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { diet } = req.body;
  const dietArr: [UserFood] = diet.content;

  if (!diet) res.status(400).send({ message: 'Submit a diet' });

  if (!diet.title) res.status(400).send({ message: 'Submit a title for diet' });

  dietArr.forEach((item) => {
    const { _id, description, grams, number } = item;

    if (!_id || !description || !grams || !number) {
      res.status(400).send({ message: 'Submit a valid food' });
    }
  });

  next();
};

export { validDiet };
