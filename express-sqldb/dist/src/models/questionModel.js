"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = __importDefault(require("./baseModel"));
class BaseQuestionModel extends baseModel_1.default {
    constructor(tableName) {
        super(tableName);
        this.addQuestion = async (newQuestion) => this.insert(newQuestion);
        this.getQuestions = async (subjectId, year) => {
            const parameter = { subjectId, examyear: year };
            return this.findBy(parameter);
        };
        this.getYears = async (subjectId) => this.findBy({ subjectId }, ['examyear']);
        this.tableName = tableName;
    }
}
exports.default = BaseQuestionModel;
