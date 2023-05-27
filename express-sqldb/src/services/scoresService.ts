import { ScoresModel } from '../models';

export const saveStudentScoreService = async (
  userId: string,
  subjectId: string,
  score: number,
  year: string,
) => {
  const timeOfTest = Date.now();
  const newScore = {
    time_of_test: timeOfTest.toString(),
    user_id: userId,
    subject_id: subjectId,
    score,
    year,
  };
  const data = await ScoresModel.saveUserHistory(newScore);
  return data;
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
