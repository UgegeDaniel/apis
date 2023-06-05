import { createToken } from '../middlewares/auth';
import { getAllStudentsService } from '../services/classService';
import { CustomController } from '../types/requestType';
import { checkTutorAccess } from '../utils/roleAccess';

export const getAllStudentsForTutor: CustomController = async (req, res, next) => {
  const { userId, role } = req;
  try {
    checkTutorAccess(role)
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
