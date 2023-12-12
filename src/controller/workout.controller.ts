import type Express from 'express';
import { Types } from 'mongoose';
import type { Request } from '@/types';
import {
  addWorkoutService,
  deleteAllWorkoutService,
  updateWorkoutService,
  deleteOneWorkoutService
} from '@/services/workout.service';

const findAllWorkout = async (req: Request, res: Express.Response) => {
  const { user } = req;

  res.status(200).send({
    workout: user!.workout
  });
};

const deleteAllWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.user!;

  try {
    await deleteAllWorkoutService(id!);

    res.status(200).send({ message: 'Workouts successfully deleted' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).send({ message: err.message });
  }
};

const addWorkout = async (req: Request, res: Express.Response) => {
  const { id, workout: userWorkouts } = req.user!;
  const { workout } = req.body;

  const oldUserWorkout = userWorkouts || {};
  const workoutId = new Types.ObjectId().toString();

  try {
    const userWorkout = await addWorkoutService(
      id!,
      workout,
      workoutId,
      oldUserWorkout
    );

    return res.status(201).send({
      message: 'Workout created successfully',
      workout: userWorkout.workout![workoutId]
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

const findOneWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { user } = req;

  res.status(200).send({
    workout: user!.workout![id]
  });
};

const updateWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { workout } = req.body;
  const { id: userId, workout: userWorkout } = req.user!;

  try {
    await updateWorkoutService(userId!, workout, id, userWorkout!);

    res.status(200).send({ message: 'Workout successfully updated' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

const deleteOneWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { id: userId, workout: userWorkout } = req.user!;

  delete userWorkout![id];

  try {
    await deleteOneWorkoutService(userId!, userWorkout!);

    res.status(200).send({ message: 'Workout successfully deleted' });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: err.message });
  }
};

export {
  findAllWorkout,
  deleteAllWorkout,
  addWorkout,
  findOneWorkout,
  updateWorkout,
  deleteOneWorkout
};
