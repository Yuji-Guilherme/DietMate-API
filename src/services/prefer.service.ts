import type { Preference } from '../types';
import { ApiError } from '../helpers/api-errors';
import { preferError } from '../constants/errors';
import {
  createPreferRepository,
  updatePreferRepository,
  deletePreferRepository
} from '../repositories/prefer.repositories';

const addPreferService = async (id: string, preference: Preference) => {
  const result = await createPreferRepository(id, preference);

  if (!result) throw new ApiError(preferError.create);

  return {
    message: 'Preference created successfully',
    preference: result.preference
  };
};

const updatePreferService = async (
  id: string,
  userPrefer: Preference,
  preference: Preference
) => {
  await updatePreferRepository(id, userPrefer, preference);

  return { message: 'Preference successfully updated' };
};

const deletePreferService = async (id: string) => {
  await deletePreferRepository(id);

  return { message: 'Preference successfully deleted' };
};

export { addPreferService, updatePreferService, deletePreferService };
