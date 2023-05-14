"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = __importDefault(require("./baseModel"));
class BaseSubjectModel extends baseModel_1.default {
    constructor(tableName) {
        super(tableName);
        this.getAllSubjects = async () => this.getAll();
        this.saveNewSubject = async (subject) => this.insert({ name: subject });
        this.tableName = tableName;
    }
}
exports.default = BaseSubjectModel;
