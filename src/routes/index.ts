import { Router } from 'express';
import { foodRouter } from './food.router';
import { exerciseRouter } from './exercise.router';
import { userRouter } from './user.router';
import { authRouter } from './auth.router';
import { dietRouter } from './diet.router';

const router = Router();

router.use('/food', foodRouter);
router.use('/exercise', exerciseRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/diet', dietRouter);

export default router;
