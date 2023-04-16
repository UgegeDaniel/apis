"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = exports.getQuestionsField = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getQuestionsField = (req) => {
    const { exam_year, question, instruction, option_a, option_b, option_c, option_d, option_e, subject_id } = req.body;
    const questionFields = [exam_year, question,
        instruction, option_a, option_b, option_c, option_d, option_e, subject_id];
    return questionFields;
};
exports.getQuestionsField = getQuestionsField;
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        return hash;
    }
    catch (error) {
        console.error(error);
    }
};
exports.hashPassword = hashPassword;
const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    return match;
};
exports.validatePassword = validatePassword;
