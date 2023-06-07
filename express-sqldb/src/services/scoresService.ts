import { ScoresModel } from '../models';
import { questionType } from '../types/tableTyes';
import { getQuestionsService } from './questionService';
import mergeArray from '../utils/mergeArrays';

export const markStudentTestService = async (
  userId: string,
  subjectId: string,
  year: string,
  userQuestions: questionType[]
) => {
  const timeOfTest = Date.now();
  const questionsWithAnswers = await getQuestionsService(subjectId, Number(year), true);
  const answered = userQuestions.filter((question) => question.userAnswer !== undefined);
  const mergedQuestions = mergeArray(questionsWithAnswers, userQuestions);
  const correct = mergedQuestions.filter((question) => question.userAnswer === question.answer);
  const score = Number(((correct.length / userQuestions.length) * 100).toFixed(2));
  const newScore = {
    time_of_test: timeOfTest.toString(),
    user_id: userId,
    subject_id: subjectId,
    score,
    year,
  };
  await ScoresModel.saveUserHistory(newScore);
  return {
    questions: mergedQuestions,
    answered: answered.length,
    correct: correct.length,
    score
  }
};

export const getStudentHistoryService = async (userId: string) => {
  const constraint = {
    primaryColumn: 'user_id',
    primaryValue: userId,
    secondaryColumn: 'subject_id',
    columOnSecondaryTable: 'subjects_uid',
  };
  const history = await ScoresModel.getUserHistory(constraint);
  const historySortedByTime = history.sort(
    (historyItem, nextHistoryItem) =>  nextHistoryItem.time_of_test - historyItem.time_of_test,
  );
  const userHistory = historySortedByTime.map((historyItem)=>(
    {
      timeOfTtest: historyItem.time_of_test,
      score: historyItem.score,
      year: historyItem.year,
      subject: historyItem.name,
    }
  ))
  return userHistory;
};
