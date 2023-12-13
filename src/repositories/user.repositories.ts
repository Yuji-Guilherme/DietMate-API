import { model, Types } from 'mongoose';
import { UserSchema } from '@/models';
import type { User } from '@/types';

const collection = model('User', UserSchema, 'Users');

const createUserRepository = async (body: User) =>
  collection.create<User>(body);

const findUserRepository = async (id: string) => collection.findById(id);

const updateUserRepository = async (
  id: Types.ObjectId | string,
  { username, password }: User
) => collection.findOneAndUpdate({ _id: id }, { username, password });

const deleteUserRepository = async (id: Types.ObjectId | string) =>
  collection.deleteOne({ _id: id });

export {
  createUserRepository,
  findUserRepository,
  updateUserRepository,
  deleteUserRepository
};
