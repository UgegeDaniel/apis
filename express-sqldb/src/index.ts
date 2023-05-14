import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import appRouter from './routes';
import errorHandler from './middlewares/errorHandler';
import dbInit from './config/dbInit';
import schemas from './schemas';
import DatabaseInstance from './config/dbInstance';
import logger from './logger';
import logReqUrl from './middlewares/logger';

require('dotenv').config();

// CONSTANTS
const PORT = Number(process.env.PORT) || 5000;
const app: Application = express();
const dbInstance = new DatabaseInstance(schemas);

// GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqUrl);

// ROUTES
app.use('/api', appRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: 'Base Route' });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, msg: 'invalid request endpoint' });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await dbInit(dbInstance, () => {
    logger.info(`SERVER RUNNING ON PORT: ${PORT}`);
  });
});
