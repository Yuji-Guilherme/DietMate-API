import type Express from 'express';
import { getAllService } from '@/services/food.service';

const getAll = async (_: Express.Request, res: Express.Response) => {
  try {
    const foods = await getAllService();

    if (foods?.length === 0) {
      res.status(404).send({ message: 'There are no foods' });
    }

    res.status(200).send(foods);
  } catch (error) {
    if (error) {
      const err = error as Error;
      res.status(500).send({ message: err.message });
    }
  }
};

export { getAll };
