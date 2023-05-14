"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res) => {
    const status = err.statusCode || 500;
    return res.status(status).json({ msg: err.message, success: false });
};
exports.default = errorHandler;
