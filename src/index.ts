import { config } from 'dotenv';
import express from 'express';

import type { Request, Response } from 'express';
config();

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to SubMind! Your subscription tracker API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...betta go catch it`);
});
