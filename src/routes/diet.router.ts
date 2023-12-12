import { Router } from 'express';
import { validDiet } from '@/middlewares/diet.middlewares';
import { findDiet, addDiet } from '@/controller/diet.controller';
import { authMiddleware } from '@/middlewares/auth.middlewares';

const dietRouter = Router();

dietRouter.get('', authMiddleware, findDiet);
dietRouter.post('', validDiet, authMiddleware, addDiet);

export { dietRouter };
