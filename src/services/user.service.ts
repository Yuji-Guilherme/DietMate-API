import { model, Types } from 'mongoose';
import { UserSchema } from '@/models';
import type { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const createUserService = async (body: User) => collection.create<User>(body);

const findUserService = async (id: string) => collection.findById(id);

const updateUserService = async (
  id: Types.ObjectId | string,
  { username, password }: User
) => collection.findOneAndUpdate({ _id: id }, { username, password });

const deleteUserService = async (id: Types.ObjectId | string) =>
  collection.deleteOne({ _id: id });

export {
  createUserService,
  findUserService,
  updateUserService,
  deleteUserService
};
