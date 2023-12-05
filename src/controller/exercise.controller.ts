import type Express from 'express';
import { getAllService } from '@/services/exercise.service';

const getAll = async (_: Express.Request, res: Express.Response) => {
  try {
    const exercises = await getAllService();

    res.status(200).send(exercises);
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { getAll };
