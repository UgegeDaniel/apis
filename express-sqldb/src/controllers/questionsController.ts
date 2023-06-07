import {
  addQuestionService,
  getAvailableYearsService,
  getQuestionsService,
} from '../services/questionService';
import { CustomController } from '../types/requestType';
import { checkStudentAccess, checkTutorAccess } from '../utils/roleAccess';

export const addNewQuestions: CustomController = async (req, res, next) => {
  const { role } = req;
  checkTutorAccess(role);
  try {
    const newQuestion = await addQuestionService(req);
    return res.status(201).json({ success: true, newQuestion });
  } catch (e) {
    return next(e);
  }
};

export const getAvailableYears: CustomController = async (req, res, next) => {
  const { role } = req;
  const { subjectId } = req.query;
  const subjectIdToString = subjectId?.toString()!;
  checkStudentAccess(role);
  try {
    const years = await getAvailableYearsService(subjectIdToString);
    return res.status(201).json({ success: true, years });
  } catch (e) {
    return next(e);
  }
};

export const getQuestions: CustomController = async (req, res, next) => {
  const { role } = req;
  const { subjectId, year } = req.query;
  const subjectIdToString = subjectId?.toString()!;
  const yearToNumber = Number(year?.toString());
  checkStudentAccess(role);
  try {
    const questions = await getQuestionsService(
      subjectIdToString,
      yearToNumber,
      false
    );
    return res.status(200).json({ success: true, questions });
  } catch (e) {
    return next(e);
  }
};
