import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { UserWorkout } from '@/types';

const collection = model('User', UserSchema, 'Users');

const addWorkoutRepository = async (
  id: string,
  workout: UserWorkout,
  workoutId: string,
  oldWorkout: { [key: string]: UserWorkout }
) =>
  collection.findByIdAndUpdate(
    id,
    { workout: { ...oldWorkout, [workoutId]: workout } },
    { new: true, upsert: true, select: 'workout' }
  );

const deleteAllWorkoutRepository = async (id: string) =>
  collection.findByIdAndUpdate(
    id,
    { workout: {} },
    { upsert: true, select: 'workout' }
  );

const updateWorkoutRepository = async (
  id: string,
  newWorkout: UserWorkout,
  workoutId: string,
  oldWorkout: { [key: string]: UserWorkout }
) =>
  collection.findByIdAndUpdate(
    id,
    { workout: { ...oldWorkout, [workoutId]: newWorkout } },
    { upsert: true, select: 'workout' }
  );

const deleteOneWorkoutRepository = async (
  id: string,
  newWorkout: { [key: string]: UserWorkout }
) =>
  collection.findByIdAndUpdate(
    id,
    { workout: { ...newWorkout } },
    { upsert: true, select: 'workout' }
  );

export {
  addWorkoutRepository,
  deleteAllWorkoutRepository,
  updateWorkoutRepository,
  deleteOneWorkoutRepository
};
