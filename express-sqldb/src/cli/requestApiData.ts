/* eslint-disable linebreak-style */
import axios from 'axios';
import updateQuestionsTable from './updateQuestionsTable';
import logger from '../logger';

const questionsUrl = process.env.QUESTIONS_URL!;
const config = (token: string) => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessToken: token,
  },
});

export default async (subject: string, year: string, subjectId: string, token: string) => {
  const url = `${questionsUrl}subject=${subject}&year=${year}&type=utme`;
  try {
    const { data } = await axios.get(url, config(token));
    const responseData = await data;
    if (responseData.data.length > 0) {
      updateQuestionsTable(responseData.data, 'questions', subjectId);
    }
    return { responseData };
  } catch (err) {
    logger.error({ err });
    return { responseData: null, err };
  }
};
