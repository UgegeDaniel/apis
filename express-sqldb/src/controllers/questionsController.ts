/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { getQuestionsField } from '../utils/index';
import { CustomRequest } from '../types';
import { SubjectModel, QuestionModel } from '../models/index';

type Question = {
  questions_uid: string;
  examyear: number;
  question: string;
  instruction: string;
  number: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  answer: string;
  subjectId: string;
  subject: string;
  subjects_name: string;
}

export const getAllSubjects = async (
  req: Request,
  res: Response,
) => {
  const { data, error } = await SubjectModel.getAll();
  return !error
    ? res.status(201).json({ data })
    : res.status(500).json({ code: 500, msg: error.detail });
};

export const addNewSubject = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req) {
    const { subject } = req.body;
    const { data, error } = await SubjectModel.insert({ name: subject.toLowerCase() });
    const msg = error?.code === '23505' ? 'Subject already exists' : error?.detail;
    return !error
      ? res.status(201).json({ data })
      : res.status(500).json({
        code: error.code,
        msg,
      });
  }
  return next({ code: 500, msg: 'Unauthorized request' });
};

export const addNewQuestions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req) {
    const questionFields = getQuestionsField(req);
    const { data: newSubject, error } = await QuestionModel.insert(questionFields);
    return !error
      ? res.status(200).json({ newSubject })
      : res.status(500).json({ success: false, msg: error.details });
  }
  return next({ code: 500, msg: 'Unauthorized request' });
};

export const getQuestions = async (
  req: Request,
  res: Response,
) => {
  const { subject, year } = req.query;
  const sub = subject?.toString().toLowerCase();
  const yr = Number(year?.toString());
  const options = { col1: 'subjectId', col2: 'subjects_uid', col3: 'name' };
  const { data, error } = await QuestionModel.innerJoin('subjects', options);
  const questions = data.filter((
    question: Question,
  ) => question.subjects_name === sub && question.examyear === yr);
  return !error && questions.length > 0
    ? res.status(200).json({ success: true, questions })
    : res.status(500).json({
      success: false,
      code: 500,
      msg: 'Error Fetching questions' || error?.details,
    });
};
