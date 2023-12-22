import mongoose from 'mongoose';
import { database } from '@/config';

const connectDataBase = async () => {
  console.log('Wait connecting to the database');

  try {
    const { URL, name } = database;

    await mongoose.connect(URL!, { dbName: name });
    return console.log('MongoDB connected');
  } catch (error) {
    return console.log(error);
  }
};

export default connectDataBase;
