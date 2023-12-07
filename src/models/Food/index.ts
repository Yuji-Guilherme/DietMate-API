import { Food } from '@/types';
import { Schema, Types } from 'mongoose';

interface FoodSchema extends Food {
  _id: Types.ObjectId;
}

const foodSchema = new Schema<FoodSchema>(
  {
    calories: { type: Number },
    carbs: { type: Number },
    description: { type: String, unique: true, required: true },
    fat: { type: Number },
    fiber: { type: Number },
    number: { type: Number, unique: true, required: true },
    protein: { type: Number }
  },
  { collection: 'Foods' }
);

export { foodSchema };
