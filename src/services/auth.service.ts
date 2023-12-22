import { compare } from 'bcryptjs';
import type { User } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import { authError } from '@/constants/errors';
import {
  loginRepository,
  generateAccessToken
} from '@/repositories/auth.repositories';

type LoginParameter = { username: Pick<User, 'username'>; password: string };

const loginService = async ({ username, password }: LoginParameter) => {
  const user = await loginRepository(username);

  if (!user) throw new ApiError(authError.incorrectUserOrPassword);

  const isValidPassword = await compare(password, user!.password);

  if (!isValidPassword) throw new ApiError(authError.incorrectUserOrPassword);

  const token = generateAccessToken(user.id);

  return token;
};

export { loginService };
