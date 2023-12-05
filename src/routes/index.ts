import { Router } from 'express';
import { foodRouter } from './food.router';
import { exerciseRouter } from './exercise.router';

const router = Router();

router.use('/food', foodRouter);
router.use('/exercise', exerciseRouter);

export default router;
