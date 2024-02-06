import { Schema, Types } from 'mongoose';
import { hash } from 'bcryptjs';
import { User, UserDiet, UserWorkout } from '../../types';
import { FoodSchema } from '../Food';
import { ExerciseSchema } from '../Exercise';

interface IUserSchema extends User {
  _id: Types.ObjectId;
  token: string;
}

const UserFoodContent = new Schema()
  .add(FoodSchema)
  .remove(['description', 'number'])
  .add({
    grams: Number,
    description: String,
    number: Number
  });

const UserExerciseContent = new Schema()
  .add(ExerciseSchema)
  .remove(['exercise', 'number'])
  .add({
    exercise: String,
    number: Number
  });

const UserDietSchema = new Schema<UserDiet>({
  title: String,
  content: UserFoodContent
});

const UserWorkoutSchema = new Schema<UserWorkout>({
  title: String,
  content: UserExerciseContent
});

const UserSchema = new Schema<IUserSchema>(
  {
    username: { type: String, unique: true, required: true, lowercase: true },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: 5,
      trim: true
    },
    diet: { type: Object, of: { type: UserDietSchema } },
    workout: { type: Object, of: { type: UserWorkoutSchema } },
    token: { type: String }
  },
  { collection: 'Users' }
);

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const userUpdated = this.getUpdate() as unknown as User;
  if (userUpdated.password)
    userUpdated.password = await hash(userUpdated.password, 10);
  next();
});

export { UserSchema, IUserSchema };
