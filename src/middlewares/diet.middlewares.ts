import type Express from 'express';
import { UserFood, Request } from '@/types';

const validDiet = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { diet } = req.body;
  const dietArr: [UserFood] = diet.content;

  if (!diet) return res.status(400).send({ message: 'Submit a diet' });

  if (!diet.title)
    return res.status(400).send({ message: 'Submit a title for diet' });

  const checker = (item: UserFood) =>
    item._id && item.number && item.description && item.grams;

  if (!dietArr.every(checker))
    return res.status(400).send({ message: 'Submit a valid food' });

  next();
};

const userDietExist = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { user } = req;

  if (!user?.diet || Object.keys(user.diet).length === 0) {
    return res.status(204).send();
  }

  if (id && !user.diet[id])
    return res.status(404).send({ message: 'Diet not found' });

  next();
};

export { validDiet, userDietExist };
