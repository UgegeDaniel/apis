/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import pool from '../connectDB';
import querries from '../utils/querries';
import { getQuestionsField } from '../utils';
import { CustomRequest } from '../types';

const {
  addNewQuestionsQuery,
  getAllSubjectsQuery,
  addNewSubjectsQuery,
  getSubjectQuery,
  getQuestionsQuerry,
} = querries;

export const getAllSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allSubjects = await pool.query(getAllSubjectsQuery);
    res.status(200).json(allSubjects.rows);
  } catch (error: any) {
    next({ code: 500, msg: error?.message });
  }
};

export const addNewSubject = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.role === 'Admin') {
    try {
      const { subject } = req.body;
      const newSubject = await pool.query(addNewSubjectsQuery, [
        subject.toLowerCase(),
      ]);
      return res.status(201).json(newSubject.rows[0]);
    } catch (error: any) {
      next({ code: 500, msg: error?.message });
      return;
    }
  }
  return res.status(403).json({
    success: false,
    message: 'You are not authorized make this request',
  });
};

export const addNewQuestions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.role === 'Admin') {
    const questionFields = getQuestionsField(req);
    try {
      const newQuestion = await pool.query(
        addNewQuestionsQuery,
        questionFields,
      );
      return res.status(201).json(newQuestion.rows[0]);
    } catch (error: any) {
      next({ code: 500, msg: error?.message });
      return;
    }
  }
  return res.status(403).json({
    success: false,
    message: 'You are not authorized make this request',
  });
};

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { subject, year } = req.query;
  try {
    const { rows } = await pool.query(getSubjectQuery, [
      subject?.toString().toLowerCase(),
    ]);
    const questions = await pool.query(getQuestionsQuerry, [
      rows[0].subject_uid,
      year,
    ]);
    if (questions.rows.length === 0) {
      return res
        .status(200)
        .json({ success: true, payload: [], msg: 'No questions found' });
    }
    const withSubjectName = questions.rows.map((question) => ({
      ...question,
      subject,
    }));
    return res.status(200).json({ success: true, payload: withSubjectName });
  } catch (error: any) {
    next({ code: 500, msg: error?.message });
  }
};
