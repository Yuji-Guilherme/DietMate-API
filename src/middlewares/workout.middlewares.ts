import type Express from 'express';
import { UserExercise, Request } from '@/types';

const validWorkout = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { workout } = req.body;
  const workoutArr: [UserExercise] = workout.content;

  if (!workout) return res.status(400).send({ message: 'Submit a workout' });

  if (!workout.title)
    return res.status(400).send({ message: 'Submit a title for workout' });

  const checker = (item: UserExercise) =>
    item._id && item.number && item.exercise && item.muscle;

  if (!workoutArr.every(checker))
    return res.status(400).send({ message: 'Submit a valid exercise' });

  next();
};

const userWorkoutExist = (
  req: Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req.params;
  const { user } = req;

  if (!user?.workout || Object.keys(user.workout).length === 0) {
    return res.status(204).send();
  }

  if (id && !user.workout[id])
    return res.status(404).send({ message: 'Workout not found' });

  next();
};

export { validWorkout, userWorkoutExist };
