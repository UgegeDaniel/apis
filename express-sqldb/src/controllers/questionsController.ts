import { NextFunction, Request, Response } from 'express';
import { getNewQuestionFromReqBody } from '../utils/index';
import { QuestionModel } from '../models/index';
import { ApiError } from '../types/apiError';

export const addNewQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const questionFields = getNewQuestionFromReqBody(req);
  try {
    const data = await QuestionModel.addQuestion(questionFields);
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
