import { Exercise, Food } from '@/types';
import { Collection } from 'mongodb';
import { connectDataBase } from './db';

type CollectionsName = 'Foods' | 'Exercises';
type Collections = Collection<Food | Exercise>;

const getCollection = async (collectionName: CollectionsName) => {
  try {
    const db = await connectDataBase();
    const collection: Collections = await db!.collection(collectionName);

    return collection;
  } catch (error) {
    return console.log(error);
  }
};

export { getCollection };
