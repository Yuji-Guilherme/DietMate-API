import { getCollection } from '@/database/collections';
import { Food } from '@/types';

const getAllService = async () => {
  const db = await getCollection('Foods');
  const foods = await db?.find<Food>({}).sort({ number: 1 }).toArray();

  if (foods?.length === 0) {
    throw new Error('There are no foods');
  }

  return foods;
};

export { getAllService };
