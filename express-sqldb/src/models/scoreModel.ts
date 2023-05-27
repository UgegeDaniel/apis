import { ConstraintType } from '../types/queryTypes';
import { scoreType } from '../types/tableTyes';
import BaseModel from './baseModel';

class BaseScoreModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  getUserHistory = async (constraint: ConstraintType) => {
    const userHistory: {
      time_of_test: number;
      score: number;
      year: number;
      name: string;
    }[] = await this.innerJoin('subjects', constraint);
    return userHistory;
  };

  saveUserHistory = async (score: scoreType) => {
    const newScore = await this.insert(score);
    return newScore;
  };
}

export default BaseScoreModel;
