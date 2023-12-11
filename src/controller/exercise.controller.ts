import type Express from 'express';
import { getAllService } from '@/services/exercise.service';

const getAll = async (_: Express.Request, res: Express.Response) => {
  try {
    const exercises = await getAllService();

    if (exercises?.length === 0) {
      return res.status(404).send({ message: 'There are no exercise' });
    }

    res.status(200).send(exercises);
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { getAll };
