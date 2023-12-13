import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import connectDataBase from './database/db';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middlewares';

const app = express();
connectDataBase();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
