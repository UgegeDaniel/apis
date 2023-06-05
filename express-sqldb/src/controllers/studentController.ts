import { CustomController } from '../types/requestType';
import { ApiError } from '../types/apiErrorType';
import {
  getStudentHistoryService,
  saveStudentScoreService,
} from '../services/scoresService';
import { createToken } from '../middlewares/auth';
import {
  getAllTutors,
  getAllTutorsForStudent,
  joinClassService,
} from '../services/classService';

export const getAvailableTutors: CustomController = async (req, res, next) => {
  const { userId, role } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    const allTutors = await getAllTutors();
    const token = createToken({ userId, role });
    return res.status(200).json({
      success: true,
      allTutors,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};

export const joinClass: CustomController = async (req, res, next) => {
  const { userId, role } = req;
  const { tutorId } = req.body;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    const newClass = await joinClassService(userId, tutorId);
    const token = createToken({ userId, role });
    return res.status(201).json({
      success: true,
      newClass,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};

export const getAllStudentsTutors: CustomController = async (
  req,
  res,
  next,
) => {
  const { userId, role } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    const userHistory = await getAllTutorsForStudent(userId);
    const token = createToken({ userId, role });
    return res.status(200).json({
      success: true,
      userHistory,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};

export const saveStudentScore: CustomController = async (req, res, next) => {
  const { subjectId, score, year } = req.body;
  const { userId, role } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    saveStudentScoreService(userId, subjectId, score, year);
    const token = createToken({ userId, role });
    return res.status(201).json({ success: true, token, role });
  } catch (e) {
    return next(e);
  }
};

export const getStudentHistory: CustomController = async (req, res, next) => {
  const { userId, role } = req;
  try {
    if (role !== 'Student') throw new ApiError(400, 'Access Denied');
    const userHistory = await getStudentHistoryService(userId);
    const token = createToken({ userId, role });
    return res.status(200).json({
      success: true,
      userHistory,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};
