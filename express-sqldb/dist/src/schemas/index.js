"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const questionSchema_1 = __importDefault(require("./questionSchema"));
const userSchema_1 = __importDefault(require("./userSchema"));
const roleSchema_1 = __importDefault(require("./roleSchema"));
const scoreSchema_1 = __importDefault(require("./scoreSchema"));
const subjectSchema_1 = __importDefault(require("./subjectSchema"));
const schemas = [
    questionSchema_1.default,
    subjectSchema_1.default,
    userSchema_1.default,
    roleSchema_1.default,
    scoreSchema_1.default,
];
exports.default = schemas;
