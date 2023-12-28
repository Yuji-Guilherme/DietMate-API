import { Router } from 'express';
import { validRefreshToken } from '@/middlewares/auth.middlewares';
import { login, logout, refresh } from '@/controller/auth.controller';

const authRouter = Router();

authRouter.post('', login);
authRouter.post('/logout', validRefreshToken, logout);
authRouter.post('/refresh', validRefreshToken, refresh);

export { authRouter };
