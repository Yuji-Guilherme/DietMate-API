import { Router } from 'express';
import {
  createUser,
  findUser,
  updateUser,
  deleteUser
} from '@/controller/user.controller';
import { authMiddleware } from '@/middlewares/auth.middlewares';

const userRouter = Router();

userRouter.post('', createUser);
userRouter.get('', authMiddleware, findUser);
userRouter.patch('', authMiddleware, updateUser);
userRouter.delete('', authMiddleware, deleteUser);

export { userRouter };
