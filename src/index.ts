import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { connectDb } from './config/DB.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';

import type { Request, Response } from 'express';

config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to SubMind! Your subscription tracker API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}...betta go catch it`);
  await connectDb();
});
