/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { ErrorType } from '../types';

// ERROR HANDLER
const errorHandler = (err: ErrorType, req: Request, res: Response) => {
  if (err) {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.status(status).json({ ...err, success: false });
  }
};

export default errorHandler;
