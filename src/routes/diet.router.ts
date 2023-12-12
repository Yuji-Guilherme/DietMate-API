import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middlewares';
import { validId } from '@/middlewares/global.middlewares';
import { validDiet, userDietExist } from '@/middlewares/diet.middlewares';
import {
  findAllDiet,
  addDiet,
  deleteAllDiet,
  findOneDiet,
  updateDiet,
  deleteOneDiet
} from '@/controller/diet.controller';

const dietRouter = Router();

dietRouter.get('', authMiddleware, userDietExist, findAllDiet);
dietRouter.delete('', authMiddleware, userDietExist, deleteAllDiet);
dietRouter.post('', validDiet, authMiddleware, addDiet);
dietRouter.get('/:id', validId, authMiddleware, userDietExist, findOneDiet);
dietRouter.patch(
  '/:id',
  validId,
  validDiet,
  authMiddleware,
  userDietExist,
  updateDiet
);
dietRouter.delete(
  '/:id',
  validId,
  authMiddleware,
  userDietExist,
  deleteOneDiet
);

export { dietRouter };
