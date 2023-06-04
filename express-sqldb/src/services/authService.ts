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

const { parsed } = require('dotenv').config();

export const referenceManager = new ReferenceManager();

const authService = {
  signUp: async (userToSignUp: UserType) => {
    const { password } = userToSignUp;
    const user: DbUserType = await UserModel.createUser({
      ...userToSignUp,
      password: await hashPassword(password),
      role_id: parsed[userToSignUp.role!.toUpperCase()],
    });
    const {
      email, name, verified, payment_ref, users_uid,
    } = user;
    const newRef = await referenceManager.createReference(user.users_uid);
    sendEmailToUser(await newRef.getReference())(
      userToSignUp.email,
      userToSignUp.name,
    );
    return {
      user: {
        email,
        name,
        verified,
        payment_ref,
        users_uid,
      },
    };
  },

  resendEmail: async (userId: string) => {
    const user: DbUserType = await UserModel.findUser({ users_uid: userId });
    const {
      verified, email, name, payment_ref, users_uid,
    } = user;
    const updatedRef = await referenceManager.updateReference(user.users_uid);
    const ref = await updatedRef.getReference();
    sendEmailToUser(ref)(user.email, user.name);
    return {
      user: {
        email,
        name,
        verified,
        payment_ref,
        users_uid,
      },
    };
  },

  verifyUserEmail: async (userId: string, ref: string) => {
    const verifiedId = await referenceManager.verifyReference(ref);
    if (verifiedId === userId) {
      const user = await UserModel.verifyEmail(userId);
      await ReferenceModel.deleteRefernce(userId);
      const {
        email, name, verified, payment_ref, users_uid,
      } = user;
      return {
        user: {
          email,
          name,
          verified,
          payment_ref,
          users_uid,
        },
      };
    }
    throw new ApiError(400, 'Email Vefication Failed');
  },

  signIn: async (userToSignIn: UserType, role: string) => {
    const { email, password } = userToSignIn;
    const user: DbUserType = await UserModel.findUser({ email });
    const {
      name, verified, payment_ref, users_uid, role_name
    } = user;
    await validatePassword(password, user.password);
    if(role_name !== role) throw new ApiError(400, 'Invalid Credentials')
    return {
      user: {
        email,
        name,
        verified,
        payment_ref,
        users_uid,
        role_name
      },
    };
  },
};

export default authService;
