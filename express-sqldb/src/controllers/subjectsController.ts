import { NextFunction, Request, Response } from 'express';
import { SubjectModel } from '../models/index';

export const getAllSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allSubjects = await SubjectModel.getAllSubjects();
    return res.status(200).json({ success: true, allSubjects });
  } catch (e) {
    return next(e);
  }
};

export const addNewSubject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { subject } = req.body;
    const newSubject = await SubjectModel.saveNewSubject(subject);
    return res.status(201).json({ success: true, newSubject });
  } catch (e) {
    return next(e);
  }
};
