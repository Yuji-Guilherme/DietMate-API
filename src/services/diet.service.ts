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

export { addDietService };
