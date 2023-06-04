import { NextFunction, Response } from 'express';
import { CustomRequest, roleType } from '../types/requestType';
import { ApiError } from '../types/apiErrorType';
import {
  getStudentHistoryService,
  saveStudentScoreService,
} from '../services/scoresService';
import { createToken } from '../middlewares/auth';

export const getStudentHistory = (role: roleType) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { userId } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    const userHistory = await getStudentHistoryService(userId);
    const token = createToken({ userId, role });
    return res.status(200).json({
      success: true,
      userHistory,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};

export const saveStudentScore = (role: roleType) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { subjectId, score, year } = req.body;
  const { userId } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    saveStudentScoreService(userId, subjectId, score, year);
    const token = createToken({ userId, role });
    return res.status(201).json({ success: true, token, role });
  } catch (e) {
    return next(e);
  }
};
