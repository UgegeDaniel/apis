import bcrypt from 'bcrypt';
import { ApiError } from '../types/apiErrorType';
import { UserModel } from '../models';
import { createToken } from '../middlewares/auth';
import { DbUserType } from '../types/tableTyes';
import { UserType } from '../types/queryTypes';
import transporter, { mailOptions, referenceManager } from './verifyEmail';

const validatePassword = async (password: string, hashedPassword: string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) throw new ApiError(400, 'Incorrect credentials');
  return match;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const sendEmailToUser = async (
  userId: string,
  email: string,
  name?: string,
) => {
  const userMailOptions = await mailOptions(userId, email, name);
  return transporter.sendMail(userMailOptions, (err: any) => {
    if (err) {
      throw new ApiError(500, 'Error verrifying your email');
    }
  });
};

const authService = {
  signUp: async (userToSignUp: UserType) => {
    const { password } = userToSignUp;
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.createUser({
      ...userToSignUp,
      password: hashedPassword,
    });
    sendEmailToUser(user?.users_uid, userToSignUp.email, userToSignUp.name);
    const token = createToken({ userId: user?.users_uid, role: 'Student' });
    return { user, token };
  },

  verifyUserEmail: async (userId: string, ref: string) => {
    const verifiedId = referenceManager.verifyReference(ref);
    if (verifiedId === userId) {
      const user = await UserModel.verifyEmail(userId);
      const token = createToken({ userId, role: 'Student' });
      return { user, token };
    }
    throw new ApiError(400, 'Email Vefication Failed');
  },

  // Send Email Again

  signIn: async (userToSignIn: UserType) => {
    const { email, password } = userToSignIn;
    const user: DbUserType = await UserModel.findUser(email);
    await validatePassword(password, user.password);
    const token = createToken({ userId: user?.users_uid, role: 'Student' });
    return { user, token };
  },
};

export default authService;
