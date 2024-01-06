import type Express from 'express';
import {
  cookieAccessTokenConfig,
  cookieRefreshTokenConfig
} from '@/constants/token';
import {
  loginService,
  logoutService,
  refreshService
} from '@/services/auth.service';
import { RequestWithId } from '@/types';

const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { username, password } = req.body;
  const oldRefreshToken = req.signedCookies.refresh;

  try {
    const { accessToken, refreshToken } = await loginService({
      username,
      password,
      oldRefreshToken
    });

    res.cookie('token', accessToken, cookieAccessTokenConfig);
    res.cookie('refresh', refreshToken, cookieRefreshTokenConfig);

    res.status(200).send({ message: 'User logged in successfully' });
  } catch (e) {
    next(e);
  }
};

const logout = async (
  req: RequestWithId,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req;

  res.clearCookie('token');
  res.clearCookie('refresh');

  try {
    const result = await logoutService(id!);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

const refresh = async (
  req: RequestWithId,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { id } = req;
  const refreshToken = req.signedCookies.refresh;

  try {
    const { newAccessToken, newRefreshToken } = await refreshService(
      id!,
      refreshToken
    );

    res.cookie('token', newAccessToken, cookieAccessTokenConfig);
    res.cookie('refresh', newRefreshToken, cookieRefreshTokenConfig);

    res.status(200).send({ message: 'Refresh token generated Successfully' });
  } catch (e) {
    next(e);
  }
};

export { login, logout, refresh };
