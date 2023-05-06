import { NextFunction, Request, Response } from 'express';
import { ScoresModel } from '../models';
import { getNewScoreFromReqBody } from '../utils';
import { CustomRequest } from '../types/requestType';
import authService from '../services/authService';
import getStudentHistoryService from '../services/scoresService';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, name } = req.body;
  try {
    const { user, token } = await authService.signUp({ name, email, password })
    return res.status(201).json({ success: true, user, token })
  } catch (e) {
    return next(e)
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.signIn({ email, password })
    return res.status(200).json({ success: true, user, token })
  } catch (e) {
    return next(e)
  }
};

export const getStudentHistory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  try {
    const data = await getStudentHistoryService(userId);
    return res.status(200).json({ success: true, userHistory: data });
  }
  catch (e) {
    return next(e)
  }
};

export const saveStudentScore = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const newScore = getNewScoreFromReqBody(req);
  try {
    const data = await ScoresModel.save(newScore);
    return res.status(201).json({ success: true, newScore: data });
  } catch (e) {
    return next(e)
  }
};
