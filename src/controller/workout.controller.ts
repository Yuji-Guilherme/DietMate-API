import type Express from 'express';
import type { Request } from '@/types';
import {
  addWorkoutService,
  deleteAllWorkoutService,
  deleteOneWorkoutService,
  updateWorkoutService
} from '@/services/workout.service';

const findAllWorkout = async (req: Request, res: Express.Response) => {
  const { user } = req;

  res.status(200).send({
    workout: user!.workout
  });
};

const deleteAllWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.user!;
  const result = await deleteAllWorkoutService(id!);

  res.status(200).send(result);
};

const addWorkout = async (req: Request, res: Express.Response) => {
  const { id, workout: userWorkouts } = req.user!;
  const { workout } = req.body;

  const result = await addWorkoutService(id!, workout, userWorkouts);

  return res.status(201).send(result);
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

  const result = await updateWorkoutService(id, userId!, workout, userWorkout!);

  res.status(200).send(result);
};

const deleteOneWorkout = async (req: Request, res: Express.Response) => {
  const { id } = req.params;
  const { id: userId, workout: userWorkout } = req.user!;

  const result = await deleteOneWorkoutService(id, userId!, userWorkout!);

  res.status(200).send(result);
};

export {
  findAllWorkout,
  deleteAllWorkout,
  addWorkout,
  findOneWorkout,
  updateWorkout,
  deleteOneWorkout
};
