import { UserExercise, UserFood } from '@/types';

const foodChecker = (item: UserFood) =>
  item._id &&
  item.number &&
  item.description &&
  item.grams &&
  item.calories &&
  item.carbs &&
  item.fat &&
  item.protein &&
  item.fiber;

const exerciseChecker = (item: UserExercise) =>
  item._id &&
  item.number &&
  item.exercise &&
  item.muscle &&
  item.barbell &&
  item.bench &&
  item.cable &&
  item.dumbbell &&
  item.machine &&
  item.smith &&
  item.unilateral;

export { foodChecker, exerciseChecker };
