import { Schema, Types } from 'mongoose';
import { Food } from '../../types';

interface IFoodSchema extends Food {
  _id: Types.ObjectId;
}

const FoodSchema = new Schema<IFoodSchema>(
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

export { FoodSchema };
