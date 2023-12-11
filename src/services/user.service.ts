import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { User, UserDiet } from '@/types';

const collection = model('User', UserSchema, 'Users');

const createService = async (body: User) => collection.create<User>(body);

const findUserService = async (id: string) => collection.findById(id);

const findDietService = async (id: string) => collection.findById(id, 'diet');

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

export { createService, findUserService, findDietService, addDietService };
