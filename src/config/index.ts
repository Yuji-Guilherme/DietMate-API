const database = {
  URL: process.env.MONGODB_URI,
  name: process.env.DB_NAME
};

const tokenEnv = {
  access: process.env.SECRET_ACCESS_JWT
};

export { database, tokenEnv };
