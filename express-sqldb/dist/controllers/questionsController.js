"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestions = exports.addNewQuestions = exports.addNewSubject = exports.getAllSubjects = void 0;
const connectDB_1 = __importDefault(require("../connectDB"));
const querries_1 = __importDefault(require("../utils/querries"));
const { addNewQuestionsQuery, getAllSubjectsQuery, addNewSubjectsQuery, getSubjectQuery, getQuestionsQuerry } = querries_1.default;
const utils_1 = require("../utils");
const getAllSubjects = async (req, res, next) => {
    try {
        const allSubjects = await connectDB_1.default.query(getAllSubjectsQuery);
        res.status(200).json(allSubjects.rows);
    }
    catch (error) {
        console.error(error.message);
        next({ code: 500, msg: error?.message });
        return;
    }
};
exports.getAllSubjects = getAllSubjects;
const addNewSubject = async (req, res, next) => {
    if (req.role === 'Admin') {
        try {
            const { subject } = req.body;
            const newSubject = await connectDB_1.default.query(addNewSubjectsQuery, [subject.toLowerCase()]);
            return res.status(201).json(newSubject.rows[0]);
        }
        catch (error) {
            next({ code: 500, msg: error?.message });
            return;
        }
    }
    return res.status(403).json({ success: false, message: "You are not authorized make this request" });
};
exports.addNewSubject = addNewSubject;
const addNewQuestions = async (req, res, next) => {
    if (req.role === 'Admin') {
        const questionFields = (0, utils_1.getQuestionsField)(req);
        try {
            const newQuestion = await connectDB_1.default.query(addNewQuestionsQuery, questionFields);
            return res.status(201).json(newQuestion.rows[0]);
        }
        catch (error) {
            next({ code: 500, msg: error?.message });
            return;
        }
    }
    return res.status(403).json({ success: false, message: "You are not authorized make this request" });
};
exports.addNewQuestions = addNewQuestions;
const getQuestions = async (req, res, next) => {
    const { subject, year } = req.query;
    try {
        const { rows } = await connectDB_1.default.query(getSubjectQuery, [subject?.toString().toLowerCase()]);
        const questions = await connectDB_1.default.query(getQuestionsQuerry, [rows[0].subject_uid, year]);
        if (questions.rows.length === 0) {
            return res.status(200).json({ success: true, payload: [], msg: "No questions found" });
        }
        const withSubjectName = questions.rows.map((question) => {
            return { ...question, subject };
        });
        return res.status(200).json({ success: true, payload: withSubjectName });
    }
    catch (error) {
        next({ code: 500, msg: error?.message });
        return;
    }
};
exports.getQuestions = getQuestions;
