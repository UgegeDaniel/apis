"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const fs_1 = require("fs");
const logger_1 = __importDefault(require("../logger"));
const updateQuestionsTable_1 = __importDefault(require("./updateQuestionsTable"));
exports.default = (year, subject, subjectId) => {
    (0, fs_1.readFile)(`./_json-questions/${subject}-${year}.json`, 'utf8', (err, data) => {
        if (err) {
            logger_1.default.error(`Error reading JSON file: ${err}`);
            return;
        }
        const jsonData = JSON.parse(data);
        if (jsonData.data.length > 0)
            (0, updateQuestionsTable_1.default)(jsonData.data, 'questions', subjectId);
    });
};
