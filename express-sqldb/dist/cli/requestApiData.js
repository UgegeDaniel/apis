"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const axios_1 = __importDefault(require("axios"));
const updateQuestionsTable_1 = __importDefault(require("./updateQuestionsTable"));
const logger_1 = __importDefault(require("../logger"));
const questionsUrl = process.env.QUESTIONS_URL;
const config = (token) => ({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        AccessToken: token,
    },
});
exports.default = async (subject, year, subjectId, token) => {
    const url = `${questionsUrl}subject=${subject}&year=${year}&type=utme`;
    try {
        const { data } = await axios_1.default.get(url, config(token));
        const responseData = await data;
        if (responseData.data.length > 0) {
            (0, updateQuestionsTable_1.default)(responseData.data, 'questions', subjectId);
        }
        return { responseData };
    }
    catch (err) {
        logger_1.default.error({ err });
        return { responseData: null, err };
    }
};
