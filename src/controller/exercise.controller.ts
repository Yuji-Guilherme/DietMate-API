import type Express from 'express';
import { findAllExerciseService } from '../services/exercise.service';

const findAllExercise = async (
  _: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const result = await findAllExerciseService();
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export { findAllExercise };
