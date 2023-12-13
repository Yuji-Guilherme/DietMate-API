import { model } from 'mongoose';
import { FoodSchema } from '@/models';
import type { Food } from '@/types';

const collection = model('Foods', FoodSchema, 'Foods');

const findAllFoodRepository = async () =>
  collection?.find<Food>().sort({ number: 1 });

export { findAllFoodRepository };
