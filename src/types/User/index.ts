import { Types } from 'mongoose';
import { Food, Exercise, Preference } from '..';

interface UserFood extends Food {
  _id: Types.ObjectId;
  grams: number;
}

interface UserExercise extends Exercise {
  _id: Types.ObjectId;
}

interface UserContentObj<T> {
  title: string;
  content: T[];
}

interface UserDiet extends UserContentObj<UserFood> {}

interface UserWorkout extends UserContentObj<UserExercise> {}

interface User {
  username: string;
  password: string;
  diet?: { [key: string]: UserDiet };
  workout?: { [key: string]: UserWorkout };
  preference?: Preference;
}

export { User, UserFood, UserExercise, UserDiet, UserWorkout };
