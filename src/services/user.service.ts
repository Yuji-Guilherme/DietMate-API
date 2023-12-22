import type { Types } from 'mongoose';
import type { User } from '@/types';
import { ApiError } from '@/helpers/api-errors';
import { userError } from '@/constants/errors';
import {
  createUserRepository,
  deleteUserRepository,
  updateUserRepository
} from '@/repositories/user.repositories';

const createUserService = async ({ username, password }: User) => {
  if (!username || !password) throw new ApiError(userError.submitAllFields);

  const user = await createUserRepository({ username, password });

  if (!user) throw new ApiError(userError.createUser);

  return {
    message: 'User created successfully',
    user: { username, id: user.id }
  };
};

const updateUserService = async (
  _id: string | Types.ObjectId,
  { username, password }: User
) => {
  if (!username && !password)
    throw new ApiError(userError.submitOneFieldToUpdate);

  await updateUserRepository(_id, { username, password });

  return { message: 'User successfully updated' };
};

const deleteUserService = async (id: string | Types.ObjectId) => {
  await deleteUserRepository(id);

  return { message: 'User successfully deleted' };
};

export { createUserService, updateUserService, deleteUserService };
