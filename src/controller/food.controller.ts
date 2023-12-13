import { findAllFoodService } from '@/services/food.service';
import type Express from 'express';

const findAllFood = async (
  _: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const result = await findAllFoodService();

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export { findAllFood };
