import { ApiError } from '../types/apiErrorType';
import { createToken } from '../middlewares/auth';
import { getAllStudentsService } from '../services/classService';
import { CustomControllerWithRole } from '../types/requestType';

export const getAllStudentsForTutor: CustomControllerWithRole = (role) => async (req, res, next) => {
  const { userId } = req;
  try {
    if (role !== 'Tutor') throw new ApiError(400, 'Access Denied');
    const allStudents = await getAllStudentsService(userId);
    const token = createToken({ userId, role });
    return res.status(201).json({
      success: true,
      allStudents,
      token,
      role,
    });
  } catch (e) {
    return next(e);
  }
};
