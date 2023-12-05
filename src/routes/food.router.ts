import { Router } from 'express';
import { getAll } from '@/controller/food.controller';

const foodRouter = Router();

foodRouter.get('', getAll);

export { foodRouter };
