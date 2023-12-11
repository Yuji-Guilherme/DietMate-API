import { model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { UserSchema } from '@/models';
import { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const loginService = (username: Pick<User, 'username'>) =>
  collection.findOne({ username }).select('+password');

const generateToken = (id: string) =>
  sign({ id }, `${process.env.SECRET_KEY}`, { expiresIn: 86400 });

export { loginService, generateToken };
