import type Express from 'express';
import { UserFood, Request } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import { foodChecker, removeBar } from '@/functions';

const validDiet = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { diet } = req.body;
  const dietArr: [UserFood] = diet.content;

  if (!diet) throw new ApiError('Submit a diet', 400);

  if (!diet.title) throw new ApiError('Submit a title for diet', 400);

  if (!dietArr.every(foodChecker))
    throw new ApiError('Submit a valid food', 400);

  next();
};

const userDietExist = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || removeBar(req.path);
  const { user } = req;

  if (!user?.diet || Object.keys(user.diet).length === 0)
    return res.status(204).send();

  if (id && !user.diet[id]) throw new ApiError('Diet not found', 404);

  next();
};

export { validDiet, userDietExist };
