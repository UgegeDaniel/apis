import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../types/apiError';

const errorHandler = (
  err: ApiError, 
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  const status = err.statusCode || 500;
  return res.status(status).json({ msg: err.message, success: false });
};

export default errorHandler;
