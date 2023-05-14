import pool from '../config/connectDB';
import logger from '../logger';
import { ApiError } from '../types/apiErrorType';

const query = async (queryString: string, options?: string[]): Promise<any> => {
  try {
    const { rows: data } = await pool.query(queryString, options);
    return data;
  } catch (err: any) {
    if (err?.code === '23505') throw new ApiError(400, 'Resource already exists');
    const error = new ApiError(500, 'Something went wrong');
    logger.error(err.message, err);
    throw error;
  }
};

export default query;
