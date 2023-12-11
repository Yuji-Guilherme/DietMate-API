import { model } from 'mongoose';
import { UserSchema } from '@/models';
import { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const loginService = (username: Pick<User, 'username'>) =>
  collection.findOne({ username }).select('+password');

export { loginService };
