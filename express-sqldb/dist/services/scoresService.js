"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentHistoryService = exports.saveStudentScoreService = void 0;
const models_1 = require("../models");
const saveStudentScoreService = async (userId, subjectId, score, year) => {
    const timeOfTest = Date.now();
    const newScore = {
        time_of_test: timeOfTest.toString(),
        user_id: userId,
        subject_id: subjectId,
        score,
        year,
    };
    const data = await models_1.ScoresModel.saveUserHistory(newScore);
    return data;
};
exports.saveStudentScoreService = saveStudentScoreService;
const getStudentHistoryService = async (userId) => {
    const constraint = {
        primaryColumn: 'user_id',
        primaryValue: userId,
        secondaryColumn: 'subject_id',
        columOnSecondaryTable: 'subjects_uid',
    };
    const history = await models_1.ScoresModel.getUserHistory(constraint);
    return history;
};
exports.getStudentHistoryService = getStudentHistoryService;
