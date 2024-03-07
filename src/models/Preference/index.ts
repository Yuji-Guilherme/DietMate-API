import { Schema } from 'mongoose';
import { Preference } from '../../types';

const PreferenceSchema = new Schema<Preference>({
  calories: { type: Number },
  carb: { type: Number },
  fat: { type: Number },
  protein: { type: Number },
  water: { type: Number },
  currentWeight: { type: Number },
  targetWeight: { type: Number }
});

export { PreferenceSchema };
