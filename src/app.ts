import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDataBase from './database/db';
import router from './routes';

const app = express();
connectDataBase();
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
