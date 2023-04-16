/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import questions from './routes/questions';
import students from './routes/students';
import errorHandler from './middlewares/errorHandler';

require('dotenv').config();

// CONSTANTS
const PORT = process.env.SERVER_PORT || 5000;
const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/questions', questions);
app.use('/api/students', students);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: 'Base Route' });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, msg: 'invalid request endpoint' });
});

app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server running on port 5000');
});
