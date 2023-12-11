import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { User, UserDiet } from '@/types';

const collection = model('User', UserSchema, 'Users');

const createUserService = async (body: User) => collection.create<User>(body);

const findUserService = async (id: string) => collection.findById(id);

const updateUserService = async (id: string, { username, password }: User) =>
  collection.findByIdAndUpdate(id, { username, password });

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

export {
  createUserService,
  findUserService,
  updateUserService,
  findDietService,
  addDietService
};
