import { Router } from 'express';
import { foodRouter } from './food.router';
import { exerciseRouter } from './exercise.router';
import { userRouter } from './user.router';

const router = Router();

router.use('/food', foodRouter);
router.use('/exercise', exerciseRouter);
router.use('/user', userRouter);

export default router;
