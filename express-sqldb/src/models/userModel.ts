import bcrypt from 'bcrypt';
import { createToken } from "../middlewares/auth";
import BaseModel from "./baseModel";
import { ApiError } from '../types/apiError';
const { parsed } = require('dotenv').config();

class BaseUserModel extends BaseModel {
    constructor(tableName: string) {
        super(tableName);
        this.tableName = tableName;
    }

    validatePassword = async (
        password: string,
        hashedPassword: string,
    ) => {
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) throw new ApiError(400, 'Incorrect credentials');
        return match;
    };

    hashPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    };

    createUser = async (name: string, email: string, password: string) => {
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.insert({
            name, email, password: hashedPassword, role_id: parsed.STUDENT_ROLE_ID,
        });
        const token = createToken({ userId: newUser?.users_uid, role: 'Student' });
        return { newUser, token }
    };

    findUser = async (email: string, password: string) => {
        const payload = await this.findBy({ email });
        const user = payload[0];
        if (!user) throw new ApiError(400, 'Invalid credentials');
        await this.validatePassword(password, user.password);
        const token = createToken({ userId: user?.users_uid, role: 'Student', });
        return { user, token }
    };
}
export default BaseUserModel