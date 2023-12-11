import { Router } from 'express';
import { validId, validUser } from '@/middlewares/global.middlewares';
import { validDiet } from '@/middlewares/diet.middlewares';
import { createUser, updateUser, findUser } from '@/controller/user.controller';
import { findDiet, addDiet } from '@/controller/diet.controller';

const userRouter = Router();

userRouter.post('', createUser);
userRouter.get('/:id', validId, validUser, findUser);
userRouter.patch('/:id', validId, validUser, updateUser);
userRouter.get('/:id/diet', validId, validUser, findDiet);
userRouter.post('/:id/diet', validId, validUser, validDiet, addDiet);

export { userRouter };
