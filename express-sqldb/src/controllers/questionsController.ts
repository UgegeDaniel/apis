import { NextFunction, Request, Response } from 'express';
import { QuestionModel } from '../models/index';
import { ApiError } from '../types/apiError';
import { CustomRequest } from '../types/requestType';
import { addQuestionService } from '../services/questionService';

export const addNewQuestions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await addQuestionService(req);
    return res.status(201).json({ success: true, data })
  } catch (e) {
    return next(e)
  }
};

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { subjectId, year } = req.query;
  if (!subjectId || !year) return new ApiError(400, 'Subject id and year required')
  const subjectIdToString = subjectId?.toString();
  const yearToNumber = Number(year?.toString());
  try {
    const data = await QuestionModel.getQuestions(subjectIdToString, yearToNumber);
    return res.status(201).json({ success: true, data })
  } catch (e) {
    return next(e)
  }
};
