import type Express from 'express';
import type { UserExercise, RequestWithUser } from '@/types';
import { workoutError } from '@/constants/errors';
import { ApiError } from '@/helpers/api-errors';
import { exerciseChecker, removeBar } from '@/utils';

const validWorkout = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { workout } = req.body;
  const workoutArr: [UserExercise] = workout.content;

  if (!workout) throw new ApiError(workoutError.submit);

  if (!workout.title) throw new ApiError(workoutError.submitTitle);

  if (!workoutArr.every(exerciseChecker))
    throw new ApiError(workoutError.invalidExercise);

  next();
};

const userWorkoutExist = (
  req: RequestWithUser,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const id = req.params.id || removeBar(req.path);
  const { user } = req;

  if (!user?.workout || Object.keys(user.workout).length === 0) {
    return res.status(204).send();
  }

  if (id && !user.workout[id]) throw new ApiError(workoutError.notFound);

  next();
};

export { validWorkout, userWorkoutExist };
