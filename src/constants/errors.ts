import { ApiErrorParameters } from '@/helpers/api-errors';

const unauthorized: ApiErrorParameters = {
  message: 'Unauthorized',
  status: 401
};

const forbidden: ApiErrorParameters = {
  message: 'Forbidden',
  status: 403
};

const invalidId: ApiErrorParameters = {
  message: 'Invalid ID',
  status: 400
};

const foodError: Record<string, ApiErrorParameters> = {
  notFound: { message: 'There are no foods', status: 404 }
};

const exerciseError: Record<string, ApiErrorParameters> = {
  notFound: { message: 'There are no exercise', status: 404 }
};

const authError: Record<string, ApiErrorParameters> = {
  userLogged: { message: 'User is already logged', status: 401 },
  invalidToken: { message: 'Invalid Token', status: 401 },
  incorrectUserOrPassword: {
    message: 'Incorrect user or password',
    status: 400
  }
};

const userError: Record<string, ApiErrorParameters> = {
  submitAllFields: { message: 'Submit all fields', status: 400 },
  createUser: { message: 'Error creating user', status: 400 },
  submitOneFieldToUpdate: {
    message: 'Submit at least one field for update',
    status: 400
  }
};

const dietError: Record<string, ApiErrorParameters> = {
  submit: { message: 'Submit a diet', status: 400 },
  submitTitle: { message: 'Submit a title for diet', status: 400 },
  invalidFood: { message: 'Submit a valid food', status: 400 },
  notFound: { message: 'Diet not found', status: 404 }
};

const workoutError: Record<string, ApiErrorParameters> = {
  submit: { message: 'Submit a workout', status: 400 },
  submitTitle: { message: 'Submit a title for workout', status: 400 },
  invalidExercise: { message: 'Submit a valid exercise', status: 400 },
  notFound: { message: 'Workout not found', status: 404 }
};

export {
  unauthorized,
  forbidden,
  invalidId,
  foodError,
  exerciseError,
  authError,
  userError,
  dietError,
  workoutError
};
