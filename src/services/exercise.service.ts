import { ApiError } from '../helpers/api-errors';
import { exerciseError } from '../constants/errors';
import { findAllExerciseRepository } from '../repositories/exercise.repositories';

const findAllExerciseService = async () => {
  const exercises = await findAllExerciseRepository();

  if (exercises?.length === 0) throw new ApiError(exerciseError.notFound);

  return exercises;
};

export { findAllExerciseService };
