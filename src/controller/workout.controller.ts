import type Express from 'express';
import type { RequestWithUser } from '@/types';
import {
  addWorkoutService,
  deleteAllWorkoutService,
  deleteOneWorkoutService,
  updateWorkoutService
} from '@/services/workout.service';

const findAllWorkout = async (req: RequestWithUser, res: Express.Response) => {
  const { user } = req;

  res.status(200).send({
    workout: user!.workout
  });
};

const deleteAllWorkout = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.user!;

  try {
    const result = await deleteAllWorkoutService(id!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const addWorkout = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id, workout: userWorkouts } = req.user!;
  const { workout } = req.body;

  try {
    const result = await addWorkoutService(id!, workout, userWorkouts);

    return res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

const findOneWorkout = async (req: RequestWithUser, res: Express.Response) => {
  const { id } = req.params;
  const { user } = req;

  res.status(200).send({
    workout: user!.workout![id]
  });
};

const updateWorkout = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { workout } = req.body;
  const { id: userId, workout: userWorkout } = req.user!;

  try {
    const result = await updateWorkoutService(
      id,
      userId!,
      workout,
      userWorkout!
    );

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const deleteOneWorkout = async (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { id: userId, workout: userWorkout } = req.user!;

  try {
    const result = await deleteOneWorkoutService(id, userId!, userWorkout!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
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
