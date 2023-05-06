import { NextFunction, Request, Response } from "express";
import { QuestionModel, SubjectModel } from '../models/index';

export const getAllSubjects = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = await SubjectModel.getAllSubjects();
        return res.status(200).json({ success: true, allSubjects: data })
    } catch (e) {
        return next(e)
    }
};

export const addNewSubject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { subject } = req.body;
        const data = await SubjectModel.save(subject);
        return res.status(201).json({ success: true, newSubject: data })
    } catch (e) {
        return next(e)
    }
};

export const getAvailableYears = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { subjectId } = req.query;
        const subjectIdToString = subjectId?.toString()!;
        const data = await QuestionModel.getYears(subjectIdToString);
        const years = Array.from(new Set (data.map((item: {examyear: number})=> item.examyear)));
        return res.status(201).json({ success: true, years})
    } catch (e) {
        return next(e)
    }
};