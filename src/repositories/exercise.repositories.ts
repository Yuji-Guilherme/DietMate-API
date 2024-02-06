import { model } from 'mongoose';
import { ExerciseSchema } from '../models';
import type { Exercise } from '../types';

const collection = model('Exercises', ExerciseSchema, 'Exercises');

const findAllExerciseRepository = async () =>
  collection?.find<Exercise>().sort({ number: 1 });

export { findAllExerciseRepository };
