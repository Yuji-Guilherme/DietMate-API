import { Router } from 'express';
import { validId, validUser } from '@/middlewares/global.middlewares';
import { validDiet } from '@/middlewares/diet.middlewares';
import {
  create,
  findUser,
  findDiet,
  addDiet
} from '@/controller/user.controller';

const userRouter = Router();

userRouter.post('', create);
userRouter.get('/:id', validId, validUser, findUser);
userRouter.get('/:id/diet', validId, validUser, findDiet);
userRouter.post('/:id/diet', validId, validUser, validDiet, addDiet);

export { userRouter };
