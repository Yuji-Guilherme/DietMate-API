import { Router } from 'express';
import { validDiet } from '@/middlewares/diet.middlewares';
import { findDiet, addDiet, deleteDiet } from '@/controller/diet.controller';
import { authMiddleware } from '@/middlewares/auth.middlewares';

const dietRouter = Router();

dietRouter.get('', authMiddleware, findDiet);
dietRouter.post('', validDiet, authMiddleware, addDiet);
dietRouter.delete('', authMiddleware, deleteDiet);

export { dietRouter };
