"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = __importDefault(require("./baseModel"));
class BaseScoreModel extends baseModel_1.default {
    constructor(tableName) {
        super(tableName);
        this.getUserHistory = async (constraint) => {
            const data = await this.innerJoin('subjects', constraint);
            return data;
        };
        this.saveUserHistory = async (score) => {
            const newScore = await this.insert(score);
            return newScore;
        };
        this.tableName = tableName;
    }
}
exports.default = BaseScoreModel;
