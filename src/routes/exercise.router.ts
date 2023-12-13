import { Router } from 'express';
import { findAllExercise } from '@/controller/exercise.controller';

const exerciseRouter = Router();

exerciseRouter.get('', findAllExercise);

export { exerciseRouter };
