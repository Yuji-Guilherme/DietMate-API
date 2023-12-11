import { Exercise } from '@/types';
import { Schema, Types } from 'mongoose';

interface IExerciseSchema extends Exercise {
  _id: Types.ObjectId;
}

const ExerciseSchema = new Schema<IExerciseSchema>(
  {
    exercise: { type: String, unique: true, required: true },
    number: { type: Number, unique: true, required: true },
    muscle: { type: String, required: true },
    unilateral: { type: Boolean },
    dumbbell: { type: Boolean },
    cable: { type: Boolean },
    barbell: { type: Boolean },
    smith: { type: Boolean },
    machine: { type: Boolean },
    bench: { type: Boolean }
  },
  { collection: 'Exercises' }
);

export { ExerciseSchema };
