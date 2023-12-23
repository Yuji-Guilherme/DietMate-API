import { model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { tokenEnv } from '@/config';
import {
  accessTokenGenerateConfig,
  refreshTokenGenerateConfig
} from '@/constants/token';
import { UserSchema } from '@/models';
import { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const loginRepository = (username: Pick<User, 'username'>) =>
  collection.findOne({ username }).select('+password');

const findUserIdRepository = async (id: string) => collection.findById(id);

const generateAccessToken = (id: string) =>
  sign({ id }, `${tokenEnv.access}`, accessTokenGenerateConfig);

const generateRefreshToken = (id: string) =>
  sign({ id }, `${tokenEnv.refresh}`, refreshTokenGenerateConfig);

export {
  loginRepository,
  findUserIdRepository,
  generateAccessToken,
  generateRefreshToken
};
