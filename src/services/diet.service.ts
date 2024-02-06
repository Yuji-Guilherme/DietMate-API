import { Types } from 'mongoose';
import type { UserDiet } from '../types';
import {
  addDietRepository,
  deleteAllDietRepository,
  updateDietRepository,
  deleteOneDietRepository
} from '../repositories/diet.repositories';

const deleteAllDietService = async (id: string) => {
  await deleteAllDietRepository(id!);

  return { message: 'Diets successfully deleted' };
};

const addDietService = async (
  id: string,
  diet: UserDiet,
  userDiets?: { [key: string]: UserDiet }
) => {
  const oldUserDiets = userDiets || {};
  const dietId = new Types.ObjectId().toString();

  const newUserDiets = await addDietRepository(id!, diet, dietId, oldUserDiets);

  return {
    message: 'Diet created successfully',
    diet: newUserDiets.diet![dietId]
  };
};

const updateDietService = async (
  id: string,
  userId: string,
  diet: UserDiet,
  userDiets?: { [key: string]: UserDiet }
) => {
  await updateDietRepository(userId!, diet, id, userDiets!);

  return { message: 'Diet successfully updated' };
};

const deleteOneDietService = async (
  id: string,
  userId: string,
  userDiet: { [key: string]: UserDiet }
) => {
  const newUserDiet = userDiet;
  delete newUserDiet![id];

  await deleteOneDietRepository(userId!, newUserDiet!);

  return { message: 'Diet successfully deleted' };
};

export {
  deleteAllDietService,
  addDietService,
  updateDietService,
  deleteOneDietService
};
