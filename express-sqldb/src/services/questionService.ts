import { QuestionModel } from '../models';
import { ApiError } from '../types/apiErrorType';
import { CustomRequest } from '../types/requestType';
import { questionType } from '../types/tableTyes';
import { escapeSingleQuotes } from '../utils';

export const getAvailableYearsService = async (subjectId: string) => {
  if (!subjectId) throw new ApiError(400, 'SubjectId required');
  const data = await QuestionModel.getYears(subjectId);
  const years: number[] = Array.from(
    new Set(data.map((item: { examyear: number }) => item.examyear)),
  );
  const sortedYears = years.sort((year, nextYear) => year - nextYear);
  return sortedYears;
};

export const getQuestionsService = async (
  subjectId: string,
  examyear: number,
  submitted: boolean,
) => {
  if (!subjectId || !examyear) {
    throw new ApiError(400, 'SubjectId and exam year required');
  }
  const data: questionType[] = await QuestionModel.getQuestions(
    subjectId,
    examyear,
  );
  const uniqueQuestions = [
    ...new Map(
      data.map((item: questionType) => [item.question, item]),
    ).values(),
  ];
  const unansweredQuestions = uniqueQuestions.map((question) => ({
    ...question,
    answer: null,
  }))
  return submitted ? uniqueQuestions : unansweredQuestions;
};

export const addQuestionService = async (req: CustomRequest) => {
  const {
    examYear,
    question,
    section,
    image,
    optiona,
    optionb,
    optionc,
    optiond,
    optione,
    subjectId,
    answer,
    examType,
  } = req.body;
  const { userId } = req;
  const newQuestion: questionType = {
    examYear,
    question: escapeSingleQuotes(question),
    section: escapeSingleQuotes(section),
    image: escapeSingleQuotes(image),
    optiona: escapeSingleQuotes(optiona),
    optionb: escapeSingleQuotes(optionb),
    optionc: escapeSingleQuotes(optionc),
    optiond: escapeSingleQuotes(optiond),
    optione: escapeSingleQuotes(optione),
    answer: escapeSingleQuotes(answer),
    subjectId,
    contributor_id: userId,
    examType: escapeSingleQuotes(examType),
  };
  const data = await QuestionModel.addQuestion(newQuestion);
  return data;
};
