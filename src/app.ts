import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import cookieParse from 'cookie-parser';
import { cookieSecret } from './config';
import connectDataBase from './database/db';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middlewares';

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || '';

connectDataBase();

app.use(
  cors({
    origin: ['http://localhost:3000', corsOrigin],
    credentials: true,
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']
  })
);

app.use(cookieParse(cookieSecret));
app.use(express.json());

app.use(router);
app.use(errorMiddleware);

export default app;
