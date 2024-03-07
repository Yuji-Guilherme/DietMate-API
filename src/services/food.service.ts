import { ApiError } from '../helpers/api-errors';
import { foodError } from '../constants/errors';
import { findAllFoodRepository } from '../repositories/food.repositories';

const findAllFoodService = async () => {
  const foods = await findAllFoodRepository();

  if (foods?.length === 0) throw new ApiError(foodError.notFound);

  return foods;
};

export { findAllFoodService };
