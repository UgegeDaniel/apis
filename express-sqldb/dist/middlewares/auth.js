"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign(id, secret, { expiresIn: '1d' });
};
exports.createToken = createToken;
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return next({ code: 401, msg: "Token required" });
    const token = authorization.split(' ')[1];
    try {
        const { studentId, role } = jsonwebtoken_1.default.verify(token, secret);
        req.studentId = studentId;
        req.role = role;
        next();
    }
    catch (error) {
        next({ code: 401, msg: "Invalid Token" });
    }
};
exports.authMiddleware = authMiddleware;
