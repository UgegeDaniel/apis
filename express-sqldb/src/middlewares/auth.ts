import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import { CustomRequest, TokenPayload } from '../types';

const secret: Secret = process.env.JWT_SECRET!;

export const createToken = (id: TokenPayload) => {
    return jwt.sign(
        id, secret, { expiresIn: '1d' }
    )
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return next({code: 401, msg: "Token required"});
    const token = authorization.split(' ')[1];
    try {
        const { studentId, role } = jwt.verify(token, secret) as TokenPayload;
        req.studentId = studentId;
        req.role = role;
        next();
    } catch (error) {
        next({code: 401, msg: "Invalid Token"});
    }
}