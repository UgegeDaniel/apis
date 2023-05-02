import { questionType } from "../types/types";
import BaseModel from "./baseModel";

class BaseQuestionModel extends BaseModel {
    constructor(tableName: string) {
        super(tableName);
        this.tableName = tableName;
    }

    addQuestion = async (newQuestion: questionType) => {
        return await this.insert(newQuestion);
    };

    getQuestions = async (subjectId: string, year: number) => {
        return await this.findBy({ subjectId, examYear: year });
    };
}

export default BaseQuestionModel;