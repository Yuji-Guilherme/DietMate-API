import type Express from 'express';
import { isValidObjectId } from 'mongoose';
import type { UserFood, RequestWithUser } from '../types';
import { dietError, invalidId } from '../constants/errors';
import { ApiError } from '../helpers/api-errors';
import { foodChecker, removeBar } from '../utils';

const validDiet = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { diet } = req.body;
  const dietArr: [UserFood] = diet.content;

  if (!diet) throw new ApiError(dietError.submit);

  if (!diet.title) throw new ApiError(dietError.submitTitle);

  if (!dietArr.every(foodChecker)) throw new ApiError(dietError.invalidFood);

  next();
};

const userDietExist = (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || removeBar(req.path);
  const { user } = req;

  if (!user?.diet || Object.keys(user.diet).length === 0)
    return res.status(204).send();

  if (id && !isValidObjectId(id)) throw new ApiError(invalidId);

  if (id && !user.diet[id]) throw new ApiError(dietError.notFound);

  next();
};

export { validDiet, userDietExist };
