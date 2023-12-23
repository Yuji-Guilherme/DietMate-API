const database = {
  URL: process.env.MONGODB_URI,
  name: process.env.DB_NAME
};

const tokenEnv = {
  access: process.env.SECRET_ACCESS_JWT,
  refresh: process.env.SECRET_REFRESH_JWT
};

const cookieSecret = process.env.COOKIE_SECRET;

export { database, tokenEnv, cookieSecret };
