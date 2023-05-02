import { NextFunction, Request, Response } from "express";
import { SubjectModel } from '../models/index';

export const getAllSubjects = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = await SubjectModel.getAllSubjects();
        return res.status(200).json({ success: true, data })
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
        return res.status(201).json({ success: true, data })
    } catch (e) {
        return next(e)
    }
};