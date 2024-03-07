import { Router } from 'express';
import {
  createUser,
  findUser,
  updateUser,
  deleteUser
} from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const userRouter = Router();

userRouter.post('', createUser);

userRouter.use(authMiddleware);
userRouter.get('', findUser);
userRouter.patch('', updateUser);
userRouter.delete('', deleteUser);

export { userRouter };
