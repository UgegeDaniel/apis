import { SubjectModel } from '../models/index';
import { Controller } from '../types/requestType';

export const getAllSubjects: Controller = async (req, res, next) => {
  try {
    const allSubjects = await SubjectModel.getAllSubjects();
    return res.status(200).json({ success: true, allSubjects });
  } catch (e) {
    return next(e);
  }
};

export const addNewSubject: Controller = async (req, res, next) => {
  try {
    const { subject } = req.body;
    const newSubject = await SubjectModel.saveNewSubject(subject);
    return res.status(201).json({ success: true, newSubject });
  } catch (e) {
    return next(e);
  }
};
