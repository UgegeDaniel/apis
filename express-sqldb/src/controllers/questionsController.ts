import { NextFunction, Request, Response } from 'express';
import { QuestionModel } from '../models/index';
import { ApiError } from '../types/apiError';
import { CustomRequest } from '../types/requestType';
import { addQuestionService, getAvailableYearsService, getQuestionsService } from '../services/questionService';

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

export const getAvailableYears = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { subjectId } = req.query;
  const subjectIdToString = subjectId?.toString()!;
  try {
      const years = await getAvailableYearsService(subjectIdToString)
      return res.status(201).json({ success: true, years })
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
  const subjectIdToString = subjectId?.toString()!;
  const yearToNumber = Number(year?.toString());
  try {
    const questions = await getQuestionsService(subjectIdToString, yearToNumber);
    return res.status(200).json({ success: true, questions })
  } catch (e) {
    return next(e)
  }
};
