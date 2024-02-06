import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middlewares';
import {
  validWorkout,
  userWorkoutExist
} from '../middlewares/workout.middlewares';
import {
  findAllWorkout,
  deleteAllWorkout,
  addWorkout,
  findOneWorkout,
  updateWorkout,
  deleteOneWorkout
} from '../controller/workout.controller';

const workoutRouter = Router();

workoutRouter.use(authMiddleware);
workoutRouter.post('', validWorkout, addWorkout);

workoutRouter.use(userWorkoutExist);
workoutRouter.get('', findAllWorkout);
workoutRouter.delete('', deleteAllWorkout);

workoutRouter.get('/:id', findOneWorkout);
workoutRouter.patch('/:id', validWorkout, updateWorkout);
workoutRouter.delete('/:id', deleteOneWorkout);

export { workoutRouter };
