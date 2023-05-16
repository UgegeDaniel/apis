/* eslint-disable linebreak-style */
import logger from '../logger';
import getFileData from './getFileData';
import requestApiData from './requestApiData';

const params: any = {};

for (let i = 2; i < process.argv.length; i += 1) {
  const paramKey = process.argv[i].split('=')[0];
  const paramValue = process.argv[i].split('=')[1];
  params[paramKey] = paramValue;
}

const {
  year, subject, subjectId, token, remote,
} = params;

if (!token || !year || !subject || !subjectId) {
  logger.error('Incomplete parameters');
}

if (!remote) {
  logger.info('Fetching questions from local file');
  getFileData(year, subject, subjectId);
}

if (remote) {
  logger.info('Fetching questions from romote api');
  requestApiData(subject, year, subjectId, token);
}
