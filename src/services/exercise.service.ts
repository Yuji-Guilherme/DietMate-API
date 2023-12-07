import { model } from 'mongoose';
import { exerciseSchema } from '@/models';
import type { Exercise } from '@/types';

const getAllService = async () => {
  const collection = model('Exercises', exerciseSchema, 'Exercises');
  const exercises = await collection?.find<Exercise>().sort({ number: 1 });

  if (exercises?.length === 0) {
    throw new Error('There are no exercise');
  }

  return exercises;
};

export { getAllService };
