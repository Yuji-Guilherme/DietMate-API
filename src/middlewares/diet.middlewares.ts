import type Express from 'express';
import { UserFood } from '@/types';

const validDiet = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { diet } = req.body;
    const dietArr: [UserFood] = diet.content;

    if (!diet) res.status(400).send({ message: 'Submit a diet' });

    if (!diet.title)
      res.status(400).send({ message: 'Submit a title for diet' });

    dietArr.forEach((item) => {
      const { _id, description, grams, number } = item;

      if (!_id || !description || !grams || !number) {
        res.status(400).send({ message: 'Submit a valid food' });
      }
    });

    next();
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { validDiet };
