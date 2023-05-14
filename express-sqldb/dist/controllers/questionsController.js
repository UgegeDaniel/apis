"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestions = exports.getAvailableYears = exports.addNewQuestions = void 0;
const questionService_1 = require("../services/questionService");
const apiErrorType_1 = require("../types/apiErrorType");
const addNewQuestions = async (req, res, next) => {
    const { role } = req;
    if (role !== 'Student')
        throw new apiErrorType_1.ApiError(401, 'You have no access');
    try {
        const newQuestion = await (0, questionService_1.addQuestionService)(req);
        return res.status(201).json({ success: true, newQuestion });
    }
    catch (e) {
        return next(e);
    }
};
exports.addNewQuestions = addNewQuestions;
const getAvailableYears = async (req, res, next) => {
    const { subjectId } = req.query;
    const subjectIdToString = subjectId?.toString();
    try {
        const years = await (0, questionService_1.getAvailableYearsService)(subjectIdToString);
        return res.status(201).json({ success: true, years });
    }
    catch (e) {
        return next(e);
    }
};
exports.getAvailableYears = getAvailableYears;
const getQuestions = async (req, res, next) => {
    const { subjectId, year } = req.query;
    const subjectIdToString = subjectId?.toString();
    const yearToNumber = Number(year?.toString());
    try {
        const questions = await (0, questionService_1.getQuestionsService)(subjectIdToString, yearToNumber);
        return res.status(200).json({ success: true, questions });
    }
    catch (e) {
        return next(e);
    }
};
exports.getQuestions = getQuestions;
