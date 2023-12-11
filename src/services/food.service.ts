import { model } from 'mongoose';
import { FoodSchema } from '@/models';
import type { Food } from '@/types';

const collection = model('Foods', FoodSchema, 'Foods');

const getAllService = async () => collection?.find<Food>().sort({ number: 1 });

export { getAllService };
