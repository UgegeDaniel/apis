"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = void 0;
/* eslint-disable linebreak-style */
const nodemailer_1 = __importDefault(require("nodemailer"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createReference = async (userId) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const ref = await bcrypt_1.default.hash(userId, salt);
    return ref;
};
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'ugege62@gmail.com',
        pass: 'tlbmqqlouaugyctt',
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const mailOptions = async (userId, userEmail, username) => {
    const ref = await createReference(userId);
    return {
        from: 'ugege62@gmail.com',
        to: userEmail,
        subject: 'Email Verification From Jakk',
        html: `${(0, utils_1.emailVerificationText)(ref, username)}`,
    };
};
exports.mailOptions = mailOptions;
exports.default = transporter;
