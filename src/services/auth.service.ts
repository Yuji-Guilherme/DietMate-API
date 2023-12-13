import { compare } from 'bcryptjs';
import { User } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import {
  loginRepository,
  generateToken
} from '@/repositories/auth.repositories';

type LoginParameter = { username: Pick<User, 'username'>; password: string };

const loginService = async ({ username, password }: LoginParameter) => {
  const user = await loginRepository(username);

  if (!user) throw new ApiError('Incorrect user or password', 400);

  const isValidPassword = await compare(password, user!.password);

  if (!isValidPassword) throw new ApiError('Incorrect user or password', 400);

  const token = generateToken(user.id);

  return token;
};

export { loginService };
