"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const logger_1 = __importDefault(require("../logger"));
const getFileData_1 = __importDefault(require("./getFileData"));
const requestApiData_1 = __importDefault(require("./requestApiData"));
const params = {};
for (let i = 2; i < process.argv.length; i += 1) {
    const paramKey = process.argv[i].split('=')[0];
    const paramValue = process.argv[i].split('=')[1];
    params[paramKey] = paramValue;
}
const { year, subject, subjectId, token, remote, } = params;
if (!token || !year || !subject || !subjectId) {
    logger_1.default.error('Incomplete parameters');
}
if (!remote) {
    logger_1.default.info('Fetching questions from local file');
    (0, getFileData_1.default)(year, subject, subjectId);
}
if (remote) {
    logger_1.default.info('Fetching questions from romote api');
    (0, requestApiData_1.default)(subject, year, subjectId, token);
}
