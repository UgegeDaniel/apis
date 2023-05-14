import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../types/apiErrorType';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.statusCode || 500;
  if (err instanceof ApiError) {
    return res.status(status).json({ msg: err.message, success: false });
  }
  return res.status(500).json({ msg: 'Something went wrong', success: false });
};

export default errorHandler;
