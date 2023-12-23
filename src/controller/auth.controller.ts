import type Express from 'express';
import {
  cookieAccessTokenConfig,
  cookieRefreshTokenConfig
} from '@/constants/token';
import { loginService, refreshService } from '@/services/auth.service';

const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginService({
      username,
      password
    });

    res.cookie('token', accessToken, cookieAccessTokenConfig);
    res.cookie('refresh', refreshToken, cookieRefreshTokenConfig);

    res.status(200).send({ message: 'User logged in successfully' });
  } catch (e) {
    next(e);
  }
};

const logout = async (_: unknown, res: Express.Response) => {
  res.clearCookie('token');
  res.clearCookie('refresh');

  res.status(200).send({ message: 'Logout Success' });
};

const refresh = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const refreshToken = req.signedCookies.refresh;

  try {
    const { newAccessToken, newRefreshToken } =
      await refreshService(refreshToken);

    res.cookie('token', newAccessToken, cookieAccessTokenConfig);
    res.cookie('refresh', newRefreshToken, cookieRefreshTokenConfig);

    res.status(200).send({ message: 'Refresh token generated Successfully' });
  } catch (e) {
    next(e);
  }
};

export { login, logout, refresh };
