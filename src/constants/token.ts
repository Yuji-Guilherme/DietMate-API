import type Express from 'express';
import type { SignOptions } from 'jsonwebtoken';

const hourInMilliseconds = 3600000;
const weekInMilliseconds = 7 * 24 * hourInMilliseconds;

const cookieAccessTokenConfig: Express.CookieOptions = {
  httpOnly: true,
  maxAge: hourInMilliseconds,
  sameSite: 'none'
};

const accessTokenGenerateConfig: SignOptions = { expiresIn: '1h' };

const cookieRefreshTokenConfig: Express.CookieOptions = {
  httpOnly: true,
  maxAge: weekInMilliseconds,
  sameSite: 'none',
  signed: true
};

const refreshTokenGenerateConfig: SignOptions = { expiresIn: '7d' };

export {
  cookieAccessTokenConfig,
  accessTokenGenerateConfig,
  cookieRefreshTokenConfig,
  refreshTokenGenerateConfig
};
