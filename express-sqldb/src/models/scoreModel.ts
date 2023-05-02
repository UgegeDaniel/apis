import { scoreType } from "../types/types";
import BaseModel from "./baseModel";

class BaseScoreModel extends BaseModel {
    constructor(tableName: string) {
        super(tableName);
        this.tableName = tableName;
    }

    getUserHistory = async (userId: string) => {
        const data = await this.findBy({ user_id: userId });
        return data
    };
    save = async (score: scoreType) => {
        const newScore = await this.insert(score);
        return newScore
    }
}

export default BaseScoreModel;