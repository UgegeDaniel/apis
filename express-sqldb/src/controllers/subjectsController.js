"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewSubject = exports.getAllSubjects = void 0;
const index_1 = require("../models/index");
const getAllSubjects = async (req, res, next) => {
    try {
        const allSubjects = await index_1.SubjectModel.getAllSubjects();
        return res.status(200).json({ success: true, allSubjects });
    }
    catch (e) {
        return next(e);
    }
};
exports.getAllSubjects = getAllSubjects;
const addNewSubject = async (req, res, next) => {
    try {
        const { subject } = req.body;
        const newSubject = await index_1.SubjectModel.saveNewSubject(subject);
        return res.status(201).json({ success: true, newSubject });
    }
    catch (e) {
        return next(e);
    }
};
exports.addNewSubject = addNewSubject;
