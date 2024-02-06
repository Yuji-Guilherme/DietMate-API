import type Express from 'express';
import type { ApiError } from '../helpers/api-errors';

const errorMiddleware = (
  error: Partial<ApiError>,
  req: Express.Request,
  res: Express.Response
) => {
  const status = error.status ?? 500;
  const message = error.message ?? 'Internal Server Error';
  return res.status(status).send({ message });
};

export { errorMiddleware };
