import { compare } from 'bcryptjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import type { User } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import { unauthorized, authError } from '@/constants/errors';
import { tokenEnv } from '@/config';
import {
  loginRepository,
  generateAccessToken,
  generateRefreshToken
} from '@/repositories/auth.repositories';
import { findUserRepository } from '@/repositories/user.repositories';

type LoginParameter = { username: Pick<User, 'username'>; password: string };

const loginService = async ({ username, password }: LoginParameter) => {
  const user = await loginRepository(username);

  if (!user) throw new ApiError(authError.incorrectUserOrPassword);

  const isValidPassword = await compare(password, user!.password);

  if (!isValidPassword) throw new ApiError(authError.incorrectUserOrPassword);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

const refreshService = async (refreshToken: string) => {
  if (!refreshToken) throw new ApiError(unauthorized);

  const decoded = verify(refreshToken, `${tokenEnv.refresh}`) as JwtPayload;

  const user = await findUserRepository(decoded.id);
  if (!user || !user.id) throw new ApiError(authError.invalidToken);

  const newAccessToken = generateAccessToken(decoded.id);
  const newRefreshToken = generateRefreshToken(decoded.id);

  return { newAccessToken, newRefreshToken };
};

export { loginService, refreshService };
