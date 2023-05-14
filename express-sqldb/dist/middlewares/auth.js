"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiErrorType_1 = require("../types/apiErrorType");
const { parsed } = require('dotenv').config();
const secret = parsed.JWT_SECRET;
const createToken = (id) => jsonwebtoken_1.default.sign(id, secret, { expiresIn: '1d' });
exports.createToken = createToken;
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        throw new apiErrorType_1.ApiError(401, 'Token required');
    const token = authorization.split(' ')[1];
    try {
        const { userId, role } = jsonwebtoken_1.default.verify(token, secret);
        req.userId = userId;
        req.role = role;
        return next();
    }
    catch (error) {
        throw new apiErrorType_1.ApiError(401, 'Invalid Token');
    }
};
exports.authMiddleware = authMiddleware;
