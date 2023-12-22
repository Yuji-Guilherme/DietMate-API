import type Express from 'express';
import type { SignOptions } from 'jsonwebtoken';

const dayInSeconds = 86400;

const cookieAccessTokenConfig: Express.CookieOptions = {
  httpOnly: true,
  maxAge: dayInSeconds
};

const accessTokenGenerateConfig: SignOptions = { expiresIn: dayInSeconds };

export { cookieAccessTokenConfig, accessTokenGenerateConfig };
