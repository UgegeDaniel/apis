/* eslint-disable linebreak-style */
import { readFile } from 'fs';
import logger from '../logger';
import updateQuestionsTable from './updateQuestionsTable';

export default (year: string, subject: string, subjectId: string) => {
  readFile(`./_json-questions/${subject}-${year}.json`, 'utf8', (err, data) => {
    if (err) {
      logger.error(`Error reading JSON file: ${err}`);
      return;
    }
    const jsonData = JSON.parse(data);
    if (jsonData.data.length > 0) updateQuestionsTable(jsonData.data, 'questions', subjectId);
  });
};
