import {
  addQuestionService,
  getAvailableYearsService,
  getQuestionsService,
} from '../services/questionService';
import { ApiError } from '../types/apiErrorType';
import { Controller, CustomController } from '../types/requestType';

export const addNewQuestions: CustomController = async (req, res, next) => {
  const { role } = req;
  if (role !== 'Student') throw new ApiError(401, 'You have no access');
  try {
    const newQuestion = await addQuestionService(req);
    return res.status(201).json({ success: true, newQuestion });
  } catch (e) {
    return next(e);
  }
};

export const getAvailableYears: Controller = async (req, res, next) => {
  const { subjectId } = req.query;
  const subjectIdToString = subjectId?.toString()!;
  try {
    const years = await getAvailableYearsService(subjectIdToString);
    return res.status(201).json({ success: true, years });
  } catch (e) {
    return next(e);
  }
};

export const getQuestions: Controller = async (req, res, next) => {
  const { subjectId, year } = req.query;
  const subjectIdToString = subjectId?.toString()!;
  const yearToNumber = Number(year?.toString());
  try {
    const questions = await getQuestionsService(
      subjectIdToString,
      yearToNumber,
    );
    return res.status(200).json({ success: true, questions });
  } catch (e) {
    return next(e);
  }
};
