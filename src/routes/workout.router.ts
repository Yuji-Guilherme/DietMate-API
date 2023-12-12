import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middlewares';
import { validId } from '@/middlewares/global.middlewares';
import {
  validWorkout,
  userWorkoutExist
} from '@/middlewares/workout.middlewares';
import {
  findAllWorkout,
  deleteAllWorkout,
  addWorkout,
  findOneWorkout,
  updateWorkout,
  deleteOneWorkout
} from '@/controller/workout.controller';

const workoutRouter = Router();

workoutRouter.get('', authMiddleware, userWorkoutExist, findAllWorkout);
workoutRouter.delete('', authMiddleware, userWorkoutExist, deleteAllWorkout);
workoutRouter.post('', validWorkout, authMiddleware, addWorkout);
workoutRouter.get(
  '/:id',
  validId,
  authMiddleware,
  userWorkoutExist,
  findOneWorkout
);
workoutRouter.patch(
  '/:id',
  validId,
  validWorkout,
  authMiddleware,
  userWorkoutExist,
  updateWorkout
);
workoutRouter.delete(
  '/:id',
  validId,
  authMiddleware,
  userWorkoutExist,
  deleteOneWorkout
);

export { workoutRouter };
