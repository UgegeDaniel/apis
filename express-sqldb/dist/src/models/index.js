"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.QuestionModel = exports.SubjectModel = exports.ScoresModel = void 0;
const questionModel_1 = __importDefault(require("./questionModel"));
const scoreModel_1 = __importDefault(require("./scoreModel"));
const subjectModel_1 = __importDefault(require("./subjectModel"));
const userModel_1 = __importDefault(require("./userModel"));
exports.ScoresModel = new scoreModel_1.default('scores');
exports.SubjectModel = new subjectModel_1.default('subjects');
exports.QuestionModel = new questionModel_1.default('questions');
exports.UserModel = new userModel_1.default('users');
