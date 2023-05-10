import bcrypt from 'bcrypt';
import { ApiError } from '../types/apiError';
import { UserModel } from '../models';
import { createToken } from "../middlewares/auth";
import { UserType } from '../types/types';
import { DbUserType } from '../types/tableTyes';

const validatePassword = async (
    password: string,
    hashedPassword: string,
) => {
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) throw new ApiError(400, 'Incorrect credentials');
    return match;
};

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const authService = {
    signUp: async (userToSignUp: UserType) => {
        const { name, email, password } = userToSignUp;
        const hashedPassword = await hashPassword(password);
        const user = await UserModel.createUser({
            name, email, password: hashedPassword,
        })
        const token = createToken({ userId: user?.users_uid, role: 'Student' });
        return { user, token }
    },

    signIn: async (userToSignIn: UserType) => {
        const { email, password } = userToSignIn;
        const user: DbUserType = await UserModel.findUser(email)
        await validatePassword(password, user.password);
        const token = createToken({ userId: user?.users_uid, role: 'Student' });
        return { user, token }
    },

}

export default authService;