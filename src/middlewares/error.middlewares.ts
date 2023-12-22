import type { ApiError } from '@/helpers/api-errors';
import Express from 'express';

const errorMiddleware = (
  error: Partial<ApiError>,
  req: Express.Request,
  res: Express.Response
) => {
  const status = error.statusCode ?? 500;
  const message = error.message ?? 'Internal Server Error';
  return res.status(status).send({ message });
};

export { errorMiddleware };