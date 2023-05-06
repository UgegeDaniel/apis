import { ConstraintType, scoreType } from "../types/types";
import BaseModel from "./baseModel";

class BaseScoreModel extends BaseModel {
    constructor(tableName: string) {
        super(tableName);
        this.tableName = tableName;
    }

    getUserHistory = async (constraint: ConstraintType) => {
        const data = await this.innerJoin('subjects', constraint );
        return data
    };
    
    save = async (score: scoreType) => {
        const newScore = await this.insert(score);
        return newScore
    }
}

export default BaseScoreModel;