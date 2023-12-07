import mongoose from 'mongoose';

const connectDataBase = async () => {
  console.log('Wait connecting to the database');

  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    await mongoose.connect(uri!, { dbName });
    return console.log('MongoDB connected');
  } catch (error) {
    return console.log(error);
  }
};

export default connectDataBase;
