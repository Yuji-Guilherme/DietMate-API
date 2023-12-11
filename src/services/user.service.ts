import { model } from 'mongoose';
import { UserSchema } from '@/models';
import type { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const createUserService = async (body: User) => collection.create<User>(body);

const findUserService = async (id: string) => collection.findById(id);

const updateUserService = async (id: string, { username, password }: User) =>
  collection.findOneAndUpdate({ _id: id }, { username, password });

export { createUserService, findUserService, updateUserService };
