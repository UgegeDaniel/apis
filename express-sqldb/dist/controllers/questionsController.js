"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestions = exports.addNewQuestions = exports.addNewSubject = exports.getAllSubjects = void 0;
const index_1 = require("../utils/index");
const index_2 = require("../models/index");
const getAllSubjects = async (req, res) => {
    const { data, error } = await index_2.SubjectModel.getAll();
    return !error
        ? res.status(200).json({ success: true, data })
        : res.status(500).json({ success: false, msg: error.detail });
};
exports.getAllSubjects = getAllSubjects;
const addNewSubject = async (req, res) => {
    if (req.role === 'Admin') {
        const { subject } = req.body;
        const { data, error } = await index_2.SubjectModel.insert({ name: subject.toLowerCase() });
        const msg = error?.code === '23505' ? 'Subject already exists' : error?.detail;
        return !error
            ? res.status(201).json({ success: true, data })
            : res.status(406).json({
                success: false,
                msg,
            });
    }
    return res.status(403).json({ success: false, msg: 'Unauthorized request' });
};
exports.addNewSubject = addNewSubject;
const addNewQuestions = async (req, res) => {
    if (req.role === 'Admin') {
        const questionFields = (0, index_1.getQuestionsField)(req);
        const { data: newSubject, error } = await index_2.QuestionModel.insert(questionFields);
        return !error
            ? res.status(201).json({ success: true, newSubject })
            : res.status(406).json({ success: false, msg: error.details });
    }
    return res.status(403).json({ success: false, msg: 'Unauthorized request' });
};
exports.addNewQuestions = addNewQuestions;
const getQuestions = async (req, res) => {
    const { subject, year } = req.query;
    const sub = subject?.toString().toLowerCase();
    const yr = Number(year?.toString());
    const options = { col1: 'subjectId', col2: 'subjects_uid', col3: 'name' };
    const { data, error } = await index_2.QuestionModel.innerJoin('subjects', options);
    const questions = data.filter((question) => question.subjects_name === sub && question.examyear === yr);
    return !error && questions.length > 0
        ? res.status(200).json({ success: true, questions })
        : res.status(404).json({
            success: false,
            msg: 'Error Fetching questions' || error?.details,
        });
};
exports.getQuestions = getQuestions;
