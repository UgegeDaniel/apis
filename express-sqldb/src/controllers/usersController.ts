import {
  ControllerWithRole,
  CustomControllerWithRole,
} from '../types/requestType';
import authService from '../services/authService';
import { createToken } from '../middlewares/auth';

export const signUp: ControllerWithRole = (role) => async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const { user } = await authService.signUp({
      name,
      email,
      password,
      role,
    });
    const token = createToken({ userId: user.users_uid, role });
    return res.status(201).json({
      success: true,
      role,
      user,
      token,
    });
  } catch (e: any) {
    return next(e);
  }
};

export const verifyEmail: CustomControllerWithRole = (role) => async (req, res, next) => {
  const { userId } = req;
  const { ref } = req.body;
  try {
    const token = createToken({ userId, role });
    const { user } = await authService.verifyUserEmail(userId, ref);
    return res.status(201).json({
      success: true,
      role,
      user,
      token,
    });
  } catch (e: any) {
    return next(e);
  }
};

export const resendEmail: CustomControllerWithRole = (role) => async (req, res, next) => {
  const { userId } = req;
  try {
    const token = createToken({ userId, role });
    const { user } = await authService.resendEmail(userId);
    return res.status(200).json({
      success: true,
      role,
      user,
      token,
    });
  } catch (e: any) {
    return next(e);
  }
};

export const signIn: ControllerWithRole = (role) => async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { user } = await authService.signIn({ email, password }, role);
    const token = createToken({ userId: user.users_uid, role });
    return res.status(200).json({
      success: true,
      user,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};
