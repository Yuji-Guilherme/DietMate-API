import { model } from 'mongoose';
import { foodSchema } from '@/models';
import type { Food } from '@/types';

const getAllService = async () => {
  const collection = model('Foods', foodSchema, 'Foods');
  const foods = await collection?.find<Food>().sort({ number: 1 });

  if (foods?.length === 0) {
    throw new Error('There are no foods');
  }

  return foods;
};

export { getAllService };
