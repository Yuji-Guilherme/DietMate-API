import { Router } from 'express';
import {
  userPreferExist,
  validPrefer
} from '../middlewares/prefer.middlewares';
import {
  createPrefer,
  findPrefer,
  updatePrefer,
  deletePrefer
} from '../controller/prefer.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const preferRouter = Router();

preferRouter.use(authMiddleware);
preferRouter.post('', validPrefer, createPrefer);

preferRouter.use(userPreferExist);
preferRouter.get('', findPrefer);
preferRouter.patch('', validPrefer, updatePrefer);
preferRouter.delete('', deletePrefer);

export { preferRouter };
