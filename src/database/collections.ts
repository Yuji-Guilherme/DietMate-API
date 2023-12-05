import { Exercise, Food } from '@/types';
import { connectDataBase } from './db';

type CollectionsName = 'Foods' | 'Exercises';
type Collections = Food | Exercise;

const getCollection = async (collectionName: CollectionsName) => {
  try {
    const db = await connectDataBase();
    const collection = await db!.collection<Collections>(collectionName);

    return collection;
  } catch (error) {
    return console.log(error);
  }
};

export { getCollection };
