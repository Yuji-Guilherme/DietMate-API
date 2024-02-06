import { UserExercise, UserFood } from '../types';

const foodChecker = (item: UserFood) =>
  item._id &&
  item.number &&
  item.description &&
  item.grams >= 0 &&
  item.calories >= 0 &&
  item.carbs >= 0 &&
  item.fat >= 0 &&
  item.protein >= 0 &&
  item.fiber >= 0;

const exerciseChecker = (item: UserExercise) =>
  item._id &&
  item.number &&
  item.exercise &&
  item.muscle &&
  typeof item.barbell === 'boolean' &&
  typeof item.bench === 'boolean' &&
  typeof item.cable === 'boolean' &&
  typeof item.dumbbell === 'boolean' &&
  typeof item.machine === 'boolean' &&
  typeof item.smith === 'boolean' &&
  typeof item.unilateral === 'boolean';

export { foodChecker, exerciseChecker };
