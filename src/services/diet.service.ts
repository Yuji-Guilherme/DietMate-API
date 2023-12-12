import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { UserDiet } from '@/types';

const collection = model('User', UserSchema, 'Users');

const addDietService = async (
  id: string,
  diet: UserDiet,
  dietId: string,
  oldDiets: { [key: string]: UserDiet }
) =>
  collection.findByIdAndUpdate(
    id,
    { diet: { ...oldDiets, [dietId]: diet } },
    { new: true, upsert: true, select: 'diet' }
  );

const deleteAllDietService = async (id: string) =>
  collection.findByIdAndUpdate(
    id,
    { diet: {} },
    { upsert: true, select: 'diet' }
  );

const updateDietService = async (
  id: string,
  newDiet: UserDiet,
  dietId: string,
  oldDiets: { [key: string]: UserDiet }
) =>
  collection.findByIdAndUpdate(
    id,
    { diet: { ...oldDiets, [dietId]: newDiet } },
    { upsert: true, select: 'diet' }
  );

const deleteOneDietService = async (
  id: string,
  newDiet: { [key: string]: UserDiet }
) =>
  collection.findByIdAndUpdate(
    id,
    { diet: { ...newDiet } },
    { upsert: true, select: 'diet' }
  );

export {
  addDietService,
  deleteAllDietService,
  updateDietService,
  deleteOneDietService
};
