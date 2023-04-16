"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = exports.getQuestionsField = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getQuestionsField = (req) => {
    const { examYear, question, instruction, optionA, optionB, optionC, optionD, optionE, subjectId, } = req.body;
    const questionFields = [
        examYear,
        question,
        instruction,
        optionA,
        optionB,
        optionC,
        optionD,
        optionE,
        subjectId,
    ];
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
        throw new Error(error.message);
    }
};
exports.hashPassword = hashPassword;
const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    return match;
};
exports.validatePassword = validatePassword;
