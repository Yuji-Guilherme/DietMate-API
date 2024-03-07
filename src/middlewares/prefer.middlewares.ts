import type Express from 'express';
import { checkPreference } from '../utils';
import type { Preference, RequestWithUser } from '../types';
import { preferError } from '../constants/errors';
import { ApiError } from '../helpers/api-errors';

const validPrefer = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const {
    preference
  }: {
    preference: Preference;
  } = req.body;

  if (!preference) throw new ApiError(preferError.submit);

  const { calories, carb, currentWeight, targetWeight, protein, water, fat } =
    preference;

  if (
    !calories &&
    !carb &&
    !currentWeight &&
    !targetWeight &&
    !protein &&
    !water &&
    !fat
  )
    throw new ApiError(preferError.submitOne);

  if (!checkPreference(preference)) throw new ApiError(preferError.invalid);

  next();
};

const userPreferExist = (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { user } = req;

  if (!user?.preference || Object.keys(user.preference).length === 0)
    return res.status(204).send();

  next();
};

export { validPrefer, userPreferExist };
