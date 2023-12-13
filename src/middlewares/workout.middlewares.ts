import type Express from 'express';
import { UserExercise, Request } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import { exerciseChecker, removeBar } from '@/functions';

const validWorkout = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { workout } = req.body;
  const workoutArr: [UserExercise] = workout.content;

  if (!workout) throw new ApiError('Submit a workout', 400);

  if (!workout.title) throw new ApiError('Submit a title for workout', 400);

  if (!workoutArr.every(exerciseChecker))
    throw new ApiError('Submit a valid exercise', 400);

  next();
};

const userWorkoutExist = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || removeBar(req.path);
  const { user } = req;

  if (!user?.workout || Object.keys(user.workout).length === 0) {
    return res.status(204).send();
  }

  if (id && !user.workout[id]) throw new ApiError('Workout not found', 404);

  next();
};

export { validWorkout, userWorkoutExist };
