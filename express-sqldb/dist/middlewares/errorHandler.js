"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiErrorType_1 = require("../types/apiErrorType");
const errorHandler = (err, req, res, _next) => {
    const status = err.statusCode || 500;
    if (err instanceof apiErrorType_1.ApiError) {
        return res.status(status).json({ msg: err.message, success: false });
    }
    return res.status(500).json({ msg: 'Something went wrong', success: false });
};
exports.default = errorHandler;
