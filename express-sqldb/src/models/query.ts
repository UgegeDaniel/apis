import pool from "../config/connectDB";
import { ApiError } from "../types/apiError";
import colors from 'colors/safe';

const query = async (queryString: string, options?: string[]): Promise<any> => {
    try {
        const { rows: data } = await pool.query(queryString, options);
        return data
    } catch (err: any) {
        if(err?.code === '23505') throw new ApiError(400, "Resource already exists")
        const error = new ApiError(500, "Something went wrong")
        console.log(colors.red(err.message));
        throw error;
    }
};

export default query;