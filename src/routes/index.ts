import { Router } from 'express';
import { foodRouter } from './food.router';
import { exerciseRouter } from './exercise.router';
import { userRouter } from './user.router';
import { authRouter } from './auth.router';
import { dietRouter } from './diet.router';
import { workoutRouter } from './workout.router';
import { preferRouter } from './prefer.router';
import { swaggerRouter } from './swagger.router';

const router = Router();

router.use('/food', foodRouter);
router.use('/exercise', exerciseRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/diet', dietRouter);
router.use('/workout', workoutRouter);
router.use('/preference', preferRouter);
router.use('/doc', swaggerRouter);

export default router;
