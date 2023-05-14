"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidators = exports.signUpValidators = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .isLength({ min: 5 })
    .withMessage('Name must be 5 chars long');
const fieldCheck = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
];
const validateMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errMsgs = errors.array().map((err) => err.msg);
        return res.status(400).json({ success: false, errors: errMsgs });
    }
    return next();
};
exports.signUpValidators = [
    nameValidation,
    ...fieldCheck,
    validateMiddleware,
];
exports.signInValidators = [...fieldCheck, validateMiddleware];
