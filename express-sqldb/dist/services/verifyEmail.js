"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.referenceManager = void 0;
/* eslint-disable linebreak-style */
const nodemailer_1 = __importDefault(require("nodemailer"));
const utils_1 = require("../utils");
const emailVerificationRefernce_1 = __importDefault(require("./emailVerificationRefernce"));
// Example usage
exports.referenceManager = new emailVerificationRefernce_1.default();
const { parsed } = require('dotenv').config();
const refExpiration = parsed.REF_EXPIRATION;
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
    const reference = exports.referenceManager.createReference(userId, refExpiration);
    return {
        from: 'ugege62@gmail.com',
        to: userEmail,
        subject: 'Email Verification From Jakk',
        html: `${(0, utils_1.emailVerificationText)(reference.getReference(), username)}`,
    };
};
exports.mailOptions = mailOptions;
exports.default = transporter;
