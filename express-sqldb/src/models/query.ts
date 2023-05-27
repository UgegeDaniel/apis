import pool from '../config/connectDB';
import logger from '../logger';
import { ApiError } from '../types/apiErrorType';

const query = async (queryString: string, options?: string[]): Promise<any> => {
  try {
    const { rows: data } = await pool.query(queryString, options);
    return data;
  } catch (err: any) {
    const duplicateError = new ApiError(400, "Couldn't perform action");
    if (err?.code === '23505') throw duplicateError;
    logger.error(err);
    throw new ApiError(500, 'Something went wrong');
  }
};

export default query;
