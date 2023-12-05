import { MongoClient } from 'mongodb';

const connectDataBase = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    const client = new MongoClient(uri);

    const db = client.db(process.env.MONGODB_COLLECTION);
    return db;
  } catch (error) {
    return console.log(error);
  }
};

export { connectDataBase };
