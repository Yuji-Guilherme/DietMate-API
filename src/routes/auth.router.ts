import { Router } from 'express';
import { login, logout, refresh } from '@/controller/auth.controller';

const authRouter = Router();

authRouter.post('', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

export { authRouter };
