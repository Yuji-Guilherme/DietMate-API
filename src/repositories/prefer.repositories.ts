import { model } from 'mongoose';
import { UserSchema } from '../models';
import type { Preference } from '../types';

const collection = model('User', UserSchema, 'Users');

const createPreferRepository = async (id: string, preference: Preference) =>
  collection.findByIdAndUpdate(
    id,
    { preference },
    { new: true, upsert: true, select: 'preference' }
  );

const updatePreferRepository = async (
  id: string,
  oldPreference: Preference,
  newPreference: Preference
) =>
  collection.findByIdAndUpdate(
    id,
    { preference: { ...oldPreference, ...newPreference } },
    { upsert: true, select: 'preference' }
  );

const deletePreferRepository = async (id: string) =>
  collection.findByIdAndUpdate(
    id,
    { preference: {} },
    { upsert: true, select: 'preference' }
  );

export {
  createPreferRepository,
  updatePreferRepository,
  deletePreferRepository
};
