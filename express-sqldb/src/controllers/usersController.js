"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStudentScore = exports.getStudentHistory = exports.signIn = exports.signUp = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const scoresService_1 = require("../services/scoresService");
const signUp = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        const { user, token } = await authService_1.default.signUp({ name, email, password });
        return res.status(201).json({ success: true, user, token });
    }
    catch (e) {
        return next(e);
    }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await authService_1.default.signIn({ email, password });
        return res.status(200).json({ success: true, user, token });
    }
    catch (e) {
        return next(e);
    }
};
exports.signIn = signIn;
const getStudentHistory = async (req, res, next) => {
    const { userId } = req;
    try {
        const userHistory = await (0, scoresService_1.getStudentHistoryService)(userId);
        return res.status(200).json({ success: true, userHistory });
    }
    catch (e) {
        return next(e);
    }
};
exports.getStudentHistory = getStudentHistory;
const saveStudentScore = async (req, res, next) => {
    const { subjectId, score } = req.body;
    const { userId } = req;
    const newScore = (0, scoresService_1.saveStudentScoreService)(userId, subjectId, score);
    try {
        return res.status(201).json({ success: true, newScore });
    }
    catch (e) {
        return next(e);
    }
};
exports.saveStudentScore = saveStudentScore;
