import { Types } from 'mongoose';
import type { UserWorkout } from '../types';
import {
  addWorkoutRepository,
  deleteAllWorkoutRepository,
  updateWorkoutRepository,
  deleteOneWorkoutRepository
} from '../repositories/workout.repositories';

const deleteAllWorkoutService = async (id: string) => {
  await deleteAllWorkoutRepository(id!);

  return { message: 'Workouts successfully deleted' };
};

const addWorkoutService = async (
  id: string,
  workout: UserWorkout,
  userWorkouts?: {
    [key: string]: UserWorkout;
  }
) => {
  const oldUserWorkout = userWorkouts || {};
  const workoutId = new Types.ObjectId().toString();

  const userWorkout = await addWorkoutRepository(
    id!,
    workout,
    workoutId,
    oldUserWorkout
  );

  return {
    message: 'Workout created successfully',
    workout: userWorkout.workout![workoutId]
  };
};

const updateWorkoutService = async (
  id: string,
  userId: string,
  workout: UserWorkout,
  userWorkout?: {
    [key: string]: UserWorkout;
  }
) => {
  await updateWorkoutRepository(userId!, workout, id, userWorkout!);

  return { message: 'Workout successfully updated' };
};

const deleteOneWorkoutService = async (
  id: string,
  userId: string,
  userWorkout: {
    [key: string]: UserWorkout;
  }
) => {
  const newUserWorkout = userWorkout;
  delete newUserWorkout![id];

  await deleteOneWorkoutRepository(userId!, newUserWorkout);

  return { message: 'Workout successfully deleted' };
};

export {
  deleteAllWorkoutService,
  addWorkoutService,
  updateWorkoutService,
  deleteOneWorkoutService
};
