import { Request, Response } from 'express';
import { ApiError } from '../types/apiErrorType';

const errorHandler = (err: ApiError, req: Request, res: Response) => {
  const status = err.statusCode || 500;
  return res.status(status).json({ msg: err.message, success: false });
};

export default errorHandler;
