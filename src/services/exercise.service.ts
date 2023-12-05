import { getCollection } from '@/database/collections';
import { Exercise } from '@/types';

const getAllService = async () => {
  const db = await getCollection('Exercises');
  const exercises = await db?.find<Exercise>({}).sort({ number: 1 }).toArray();

  if (exercises?.length === 0) {
    throw new Error('There are no exercise');
  }

  return exercises;
};

export { getAllService };
