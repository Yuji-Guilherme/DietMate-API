import { compare } from 'bcryptjs';
import type { User } from '../types';
import { ApiError } from '../helpers/api-errors';
import { authError, forbidden } from '../constants/errors';
import {
  loginRepository,
  addRefreshTokenRepository,
  deleteRefreshTokenRepository,
  updateRefreshTokenRepository,
  generateAccessToken,
  generateRefreshToken
} from '../repositories/auth.repositories';

type LoginParameter = {
  username: Pick<User, 'username'>;
  password: string;
  oldRefreshToken?: string;
};

const loginService = async ({
  username,
  password,
  oldRefreshToken
}: LoginParameter) => {
  if (oldRefreshToken) throw new ApiError(authError.userLogged);

  const user = await loginRepository(username);

  if (!user) throw new ApiError(authError.incorrectUserOrPassword);

  const isValidPassword = await compare(password, user!.password);

  if (!isValidPassword) throw new ApiError(authError.incorrectUserOrPassword);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await addRefreshTokenRepository(user.id, refreshToken);

  return { accessToken, refreshToken };
};

const logoutService = async (id: string) => {
  const user = await deleteRefreshTokenRepository(id);

  if (!user) throw new ApiError(forbidden);

  return { message: 'Logout Success' };
};

const refreshService = async (id: string) => {
  const newAccessToken = generateAccessToken(id);
  const newRefreshToken = generateRefreshToken(id);

  const user = await updateRefreshTokenRepository(id, newRefreshToken);

  if (!user || !user.token) throw new ApiError(forbidden);

  return { newAccessToken, newRefreshToken };
};

export { loginService, logoutService, refreshService };
