/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { getQuestionsField } from '../utils/index';
import { CustomRequest, Question } from '../types';
import { SubjectModel, QuestionModel } from '../models/index';

export const getAllSubjects = async (
  req: Request,
  res: Response,
) => {
  const { data, error } = await SubjectModel.getAll();
  return !error
    ? res.status(200).json({ success: true, data })
    : res.status(500).json({ success: false, msg: error.detail });
};

export const addNewSubject = async (
  req: CustomRequest,
  res: Response,
) => {
  if (req.role === 'Admin') {
    const { subject } = req.body;
    const { data, error } = await SubjectModel.insert({ name: subject.toLowerCase() });
    const msg = error?.code === '23505' ? 'Subject already exists' : error?.detail;
    return !error
      ? res.status(201).json({ success: true, data })
      : res.status(406).json({
        success: false,
        msg,
      });
  }
  return res.status(403).json({ success: false, msg: 'Unauthorized request' });
};

export const addNewQuestions = async (
  req: CustomRequest,
  res: Response,
) => {
  if (req.role === 'Admin') {
    const questionFields = getQuestionsField(req);
    const { data: newSubject, error } = await QuestionModel.insert(questionFields);
    return !error
      ? res.status(201).json({ success: true, newSubject })
      : res.status(406).json({ success: false, msg: error.details });
  }
  return res.status(403).json({ success: false, msg: 'Unauthorized request' });
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
    : res.status(404).json({
      success: false,
      msg: 'Error Fetching questions' || error?.details,
    });
};
