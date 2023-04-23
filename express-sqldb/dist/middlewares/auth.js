"use strict";
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const createToken = (id) => jsonwebtoken_1.default.sign(id, secret, { expiresIn: '1d' });
exports.createToken = createToken;
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ msg: 'Token required' });
    const token = authorization.split(' ')[1];
    try {
        const { userId, role } = jsonwebtoken_1.default.verify(token, secret);
        req.userId = userId;
        req.role = role;
        next();
        return;
    }
    catch (error) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
};
exports.authMiddleware = authMiddleware;
