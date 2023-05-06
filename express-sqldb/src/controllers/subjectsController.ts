import { NextFunction, Request, Response } from "express";
import { SubjectModel } from '../models/index';
import { getAvailableYearsService } from "../services/questionService";

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
    const { subjectId } = req.query;
    const subjectIdToString = subjectId?.toString()!;
    try {
        const years = await getAvailableYearsService(subjectIdToString)
        return res.status(201).json({ success: true, years })
    } catch (e) {
        return next(e)
    }
};