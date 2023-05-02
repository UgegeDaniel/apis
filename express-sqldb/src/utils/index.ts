import { Request } from 'express';
import { questionType, scoreType } from '../types/types';
import { CustomRequest } from '../types/requestType';
import { ApiError } from '../types/apiError';

export const getNewQuestionFromReqBody = (req: Request): questionType => {
  const {
    examYear, number, question, instruction, optionA,
    optionB, optionC, optionD, optionE, subjectId, answer,
  } = req.body;
  return {
    examYear, number, question, instruction, optionA, optionB,
    optionC, optionD, optionE, subjectId, answer,
  }
};

export const getNewScoreFromReqBody = (req: CustomRequest): scoreType => {
  const { subject_id, score } = req.body;
  const { userId } = req;
  const timeOfTest = Date.now();
  return {
    time_of_test: timeOfTest.toString(),
    user_id: userId,
    subject_id,
    score
  }
};
