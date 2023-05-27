import { ApiError } from '../types/apiErrorType';
import { ReferenceModel, UserModel } from '../models';
import { createToken } from '../middlewares/auth';
import { DbUserType } from '../types/tableTyes';
import { UserType } from '../types/queryTypes';
import ReferenceManager from './emailVerificationRefernce';
import {
  hashPassword,
  sendEmailToUser,
  validatePassword,
} from '../utils/authUtils';

export const referenceManager = new ReferenceManager();

const authService = {
  signUp: async (userToSignUp: UserType) => {
    const { password } = userToSignUp;
    const user: DbUserType = await UserModel.createUser({
      ...userToSignUp,
      password: await hashPassword(password),
    });
    const { email, name, verified } = user;
    const newRef = await referenceManager.createReference(user.users_uid);
    sendEmailToUser(await newRef.getReference())(
      userToSignUp.email,
      userToSignUp.name,
    );
    const token = createToken({ userId: user.users_uid, role: 'Student' });
    return { user: { email, name, verified }, token };
  },

  resendEmail: async (userId: string) => {
    const user: DbUserType = await UserModel.findUser({ users_uid: userId });
    const { verified, email, name } = user;
    const updatedRef = await referenceManager.updateReference(user.users_uid);
    const ref = await updatedRef.getReference();
    sendEmailToUser(ref)(user.email, user.name);
    const token = createToken({ userId: user.users_uid, role: 'Student' });
    return { user: { email, name, verified }, token };
  },

  verifyUserEmail: async (userId: string, ref: string) => {
    const verifiedId = await referenceManager.verifyReference(ref);
    if (verifiedId === userId) {
      const user = await UserModel.verifyEmail(userId);
      await ReferenceModel.deleteRefernce(userId);
      const { email, name, verified } = user;
      const token = createToken({ userId: user.users_uid, role: 'Student' });
      return { user: { email, name, verified }, token };
    }
    throw new ApiError(400, 'Email Vefication Failed');
  },

  signIn: async (userToSignIn: UserType) => {
    const { email, password } = userToSignIn;
    const user: DbUserType = await UserModel.findUser({ email });
    const { name, verified } = user;
    await validatePassword(password, user.password);
    const token = createToken({ userId: user.users_uid, role: 'Student' });
    return { user: { email, name, verified }, token };
  },
};

export default authService;
