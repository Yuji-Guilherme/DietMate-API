import { model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { tokenEnv } from '../config';
import {
  accessTokenGenerateConfig,
  refreshTokenGenerateConfig
} from '../constants/token';
import { UserSchema } from '../models';
import { User } from '../types';

const collection = model('User', UserSchema, 'Users');

const loginRepository = (username: Pick<User, 'username'>) =>
  collection.findOne({ username }).select('+password');

const addRefreshTokenRepository = async (id: string, refreshToken: string) =>
  collection.findByIdAndUpdate(id, { token: refreshToken });

const updateRefreshTokenRepository = async (
  id: string,
  oldRefreshToken: string,
  newRefreshToken: string
) =>
  collection.findOneAndUpdate(
    { _id: id, token: oldRefreshToken },
    { token: newRefreshToken }
  );

const deleteRefreshTokenRepository = async (id: string) =>
  collection.findByIdAndUpdate(id, { token: '' });

const generateAccessToken = (id: string) =>
  sign({ id }, `${tokenEnv.access}`, accessTokenGenerateConfig);

const generateRefreshToken = (id: string) =>
  sign({ id }, `${tokenEnv.refresh}`, refreshTokenGenerateConfig);

export {
  loginRepository,
  addRefreshTokenRepository,
  updateRefreshTokenRepository,
  deleteRefreshTokenRepository,
  generateAccessToken,
  generateRefreshToken
};
