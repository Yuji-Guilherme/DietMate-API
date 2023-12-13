import type Express from 'express';
import { findAllExerciseService } from '@/services/exercise.service';

const findAllExercise = async (_: Express.Request, res: Express.Response) => {
  const result = await findAllExerciseService();
  res.status(200).send(result);
};

export { findAllExercise };
