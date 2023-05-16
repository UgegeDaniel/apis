/* eslint-disable linebreak-style */
import logger from '../logger';
import query from '../models/query';
import { apiQuestionType, questionType } from '../types/tableTyes';
import { escapeSingleQuotes } from '../utils';

const adminId = process.env.ADMIN_ROLE_ID!;

const questionToInsert = (item: apiQuestionType, subjectId: string): questionType => ({
  examYear: item.examyear,
  question: escapeSingleQuotes(item.question),
  section: escapeSingleQuotes(item.section),
  image: escapeSingleQuotes(item.image),
  optiona: escapeSingleQuotes(item.option.a),
  optionb: escapeSingleQuotes(item.option.b),
  optionc: escapeSingleQuotes(item.option.c),
  optiond: escapeSingleQuotes(item.option.d),
  optione: escapeSingleQuotes(item.option.e),
  answer: escapeSingleQuotes(item.answer),
  subjectId,
  contributor_id: adminId,
  examType: escapeSingleQuotes(item.examtype),
});

export default async (data: apiQuestionType[], tableName: string, subjectId: string) => {
  const queryStrings: string[] = [];
  data.forEach((item: apiQuestionType) => {
    const itemsToInsert = questionToInsert(item, subjectId);
    const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
    const columnNames = [`${tableName}_uid`, ...Object.keys(itemsToInsert)];
    const queryString = `
          INSERT INTO ${tableName} 
          (${columnNames})
          VALUES (uuid_generate_v4(), '${values}');`;
    queryStrings.push(queryString);
  });

  const insertionQueryString = queryStrings.join('');
  const queryResponse = await query(insertionQueryString);
  logger.info(queryResponse);
};
