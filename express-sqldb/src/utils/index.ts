import { scoreType } from '../types/types';
import { CustomRequest } from '../types/requestType';

export const getNewScoreFromReqBody = (req: CustomRequest): scoreType => {
  const { subjectId, score } = req.body;
  const { userId } = req;
  const timeOfTest = Date.now();
  return {
    time_of_test: timeOfTest.toString(),
    user_id: userId,
    subject_id: subjectId,
    score
  }
};

// https://www.convertjson.com/json-to-sql.htm
