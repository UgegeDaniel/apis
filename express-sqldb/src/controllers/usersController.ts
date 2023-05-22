import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types/requestType';
import authService from '../services/authService';
import {
  getStudentHistoryService,
  saveStudentScoreService,
} from '../services/scoresService';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, name } = req.body;
  try {
    const { user, token } = await authService.signUp({
      name,
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      user,
      token,
      msg: `An email has been sent to ${email}, please verify`,
    });
  } catch (e: any) {
    return next(e);
  }
};

export const verifyEmail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  const { ref } = req.body;
  try {
    const { user, token } = await authService.verifyUserEmail(userId, ref);
    return res.status(201).json({ success: true, user, token });
  } catch (e: any) {
    return next(e);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.signIn({ email, password });
    return res.status(200).json({ success: true, user, token });
  } catch (e) {
    return next(e);
  }
};

export const getStudentHistory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  try {
    const userHistory = await getStudentHistoryService(userId);
    return res.status(200).json({ success: true, userHistory });
  } catch (e) {
    return next(e);
  }
};

export const saveStudentScore = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { subjectId, score, year } = req.body;
  const { userId } = req;
  const newScore = saveStudentScoreService(userId, subjectId, score, year);
  try {
    return res.status(201).json({ success: true, newScore });
  } catch (e) {
    return next(e);
  }
};
