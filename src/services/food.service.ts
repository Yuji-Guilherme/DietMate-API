import { ApiError } from '@/helpers/api-errors';
import { findAllFoodRepository } from '@/repositories/food.repositories';

const findAllFoodService = async () => {
  const foods = await findAllFoodRepository();

  if (foods?.length === 0) throw new ApiError('There are no foods', 404);

  return foods;
};

export { findAllFoodService };
