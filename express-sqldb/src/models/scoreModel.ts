import { ConstraintType } from '../types/queryTypes';
import { scoreType } from '../types/tableTyes';
import BaseModel from './baseModel';

class BaseScoreModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  getUserHistory = async (constraint: ConstraintType) => {
    const data = await this.innerJoin('subjects', constraint);
    return data;
  };

  saveUserHistory = async (score: scoreType) => {
    const newScore = await this.insert(score);
    return newScore;
  };
}

export default BaseScoreModel;
