import { Router } from 'express';
import { getAll } from '@/controller/exercise.controller';

const exerciseRouter = Router();

exerciseRouter.get('', getAll);

export { exerciseRouter };
