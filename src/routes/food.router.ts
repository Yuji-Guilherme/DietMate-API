import { Router } from 'express';
import { findAllFood } from '@/controller/food.controller';

const foodRouter = Router();

foodRouter.get('', findAllFood);

export { foodRouter };
