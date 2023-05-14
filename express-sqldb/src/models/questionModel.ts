import { questionType } from '../types/tableTyes';
import BaseModel from './baseModel';

class BaseQuestionModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  addQuestion = async (newQuestion: questionType) => this.insert(newQuestion);

  getQuestions = async (subjectId: string, year: number) => {
    const parameter = { subjectId, examyear: year };
    return this.findBy(parameter);
  };

  getYears = async (subjectId: string) => this.findBy({ subjectId }, ['examyear']);
}

export default BaseQuestionModel;
