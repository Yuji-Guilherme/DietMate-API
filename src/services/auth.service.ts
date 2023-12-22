import { compare } from 'bcryptjs';
import { User } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import {
  loginRepository,
  generateAccessToken
} from '@/repositories/auth.repositories';

type LoginParameter = { username: Pick<User, 'username'>; password: string };

const loginService = async ({ username, password }: LoginParameter) => {
  const user = await loginRepository(username);

  if (!user) throw new ApiError('Incorrect user or password', 400);

  const isValidPassword = await compare(password, user!.password);

  if (!isValidPassword) throw new ApiError('Incorrect user or password', 400);

  const token = generateAccessToken(user.id);

  return token;
};

export { loginService };
