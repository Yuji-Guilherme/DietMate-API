import { ApiError } from '@/helpers/api-errors';
import { findAllExerciseRepository } from '@/repositories/exercise.repositories';

const findAllExerciseService = async () => {
  const exercises = await findAllExerciseRepository();

  if (exercises?.length === 0) throw new ApiError('There are no exercise', 404);

  return exercises;
};

export { findAllExerciseService };
