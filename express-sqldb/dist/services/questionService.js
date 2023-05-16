"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestionService = exports.getQuestionsService = exports.getAvailableYearsService = void 0;
const models_1 = require("../models");
const apiErrorType_1 = require("../types/apiErrorType");
const utils_1 = require("../utils");
const getAvailableYearsService = async (subjectId) => {
    if (!subjectId)
        throw new apiErrorType_1.ApiError(400, 'SubjectId required');
    const data = await models_1.QuestionModel.getYears(subjectId);
    const years = Array.from(new Set(data.map((item) => item.examyear)));
    return years;
};
exports.getAvailableYearsService = getAvailableYearsService;
const getQuestionsService = async (subjectId, examyear) => {
    if (!subjectId || !examyear) {
        throw new apiErrorType_1.ApiError(400, 'SubjectId and exam year required');
    }
    const data = await models_1.QuestionModel.getQuestions(subjectId, examyear);
    const questions = [
        ...new Map(data.map((item) => [item.question, item])).values(),
    ];
    return questions;
};
exports.getQuestionsService = getQuestionsService;
const addQuestionService = async (req) => {
    const { examYear, question, section, image, optiona, optionb, optionc, optiond, optione, subjectId, answer, examType, } = req.body;
    const { userId } = req;
    const newQuestion = {
        examYear,
        question: (0, utils_1.escapeSingleQuotes)(question),
        section: (0, utils_1.escapeSingleQuotes)(section),
        image: (0, utils_1.escapeSingleQuotes)(image),
        optiona: (0, utils_1.escapeSingleQuotes)(optiona),
        optionb: (0, utils_1.escapeSingleQuotes)(optionb),
        optionc: (0, utils_1.escapeSingleQuotes)(optionc),
        optiond: (0, utils_1.escapeSingleQuotes)(optiond),
        optione: (0, utils_1.escapeSingleQuotes)(optione),
        answer: (0, utils_1.escapeSingleQuotes)(answer),
        subjectId,
        contributor_id: userId,
        examType: (0, utils_1.escapeSingleQuotes)(examType),
    };
    const data = await models_1.QuestionModel.addQuestion(newQuestion);
    return data;
};
exports.addQuestionService = addQuestionService;
