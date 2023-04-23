"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoresModel = exports.UserModel = exports.QuestionModel = exports.SubjectModel = void 0;
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
const baseModel_1 = __importDefault(require("./baseModel"));
exports.SubjectModel = new baseModel_1.default('subjects');
exports.QuestionModel = new baseModel_1.default('questions');
exports.UserModel = new baseModel_1.default('users');
exports.ScoresModel = new baseModel_1.default('scores');
