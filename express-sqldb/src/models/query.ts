import pool from "../config/connectDB";
import { ApiError } from "../types/apiError";

const query = async (queryString: string, options?: string[]): Promise<any> => {
    try {
        const { rows: data } = await pool.query(queryString, options);
        console.log(data)
        return data
    } catch (err: any) {
        if(err?.code === '23505') throw new ApiError(400, "Resource already exists")
        console.log(err)
        const error = new ApiError(500, "Something went wrong")
        throw error;
    }
};

export default query;