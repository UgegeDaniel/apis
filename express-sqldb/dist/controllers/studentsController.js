"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const connectDB_1 = __importDefault(require("../connectDB"));
const querries_1 = __importDefault(require("../utils/querries"));
const auth_1 = require("../middlewares/auth");
const utils_1 = require("../utils");
const { signupQuery, signinQuery, roleQuery } = querries_1.default;
const signUp = async (req, res, next) => {
    const { email, password, name } = req.body;
    const hashedPassword = await (0, utils_1.hashPassword)(password);
    try {
        const { rows } = await connectDB_1.default.query(signupQuery, [name, email, hashedPassword]);
        const { rows: roleRows } = await connectDB_1.default.query(roleQuery, [rows[0].role_id]);
        const token = (0, auth_1.createToken)({ studentId: rows[0].student_uid, role: roleRows[0].name });
        return res.status(201).json({ newStudent: rows[0], token, role: roleRows[0].name });
    }
    catch (error) {
        if (error?.code === '23505') {
            next({ code: 23505, msg: `User with email: '${email}' already exists` });
            console.log(error.code);
            return;
        }
        next({ code: error?.code, msg: error?.message });
        return;
    }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { rows } = await connectDB_1.default.query(signinQuery, [email]);
        if (!rows[0]) {
            next({ code: 404, msg: `User with email: "${email}" not found` });
        }
        const role = await connectDB_1.default.query(roleQuery, [rows[0].role_id]);
        const token = (0, auth_1.createToken)({ studentId: rows[0].student_uid, role: role.rows[0].name });
        return await (0, utils_1.validatePassword)(password, rows[0].password)
            ? res.status(201).json({ newStudent: rows[0], token, role: role.rows[0].name })
            : next({ code: 403, msg: "Password incorrect" });
    }
    catch (error) {
        next({ code: 500, msg: error.message });
        return;
    }
};
exports.signIn = signIn;
