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

dietRouter.use(authMiddleware);
dietRouter.post('', validDiet, addDiet);

dietRouter.use(userDietExist);
dietRouter.get('', findAllDiet);
dietRouter.delete('', deleteAllDiet);

dietRouter.use(validId);
dietRouter.get('/:id', findOneDiet);
dietRouter.patch('/:id', validDiet, updateDiet);
dietRouter.delete('/:id', deleteOneDiet);

export { dietRouter };
