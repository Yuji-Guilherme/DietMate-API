import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { UserWorkout } from '@/types';

const collection = model('User', UserSchema, 'Users');

const addWorkoutService = async (
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

const deleteAllWorkoutService = async (id: string) =>
  collection.findByIdAndUpdate(
    id,
    { workout: {} },
    { upsert: true, select: 'workout' }
  );

const updateWorkoutService = async (
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

const deleteOneWorkoutService = async (
  id: string,
  newWorkout: { [key: string]: UserWorkout }
) =>
  collection.findByIdAndUpdate(
    id,
    { workout: { ...newWorkout } },
    { upsert: true, select: 'workout' }
  );

export {
  addWorkoutService,
  deleteAllWorkoutService,
  updateWorkoutService,
  deleteOneWorkoutService
};
