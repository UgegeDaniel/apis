import BaseQuestionModel from './questionModel';
import BaseScoreModel from './scoreModel';
import BaseSubjectModel from './subjectModel';
import BaseUserModel from './userModel';
import BaseReferenceModel from './referenceModel';

export const ScoresModel = new BaseScoreModel('scores');
export const SubjectModel = new BaseSubjectModel('subjects');
export const QuestionModel = new BaseQuestionModel('questions');
export const UserModel = new BaseUserModel('users');
export const ReferenceModel = new BaseReferenceModel('refs');
