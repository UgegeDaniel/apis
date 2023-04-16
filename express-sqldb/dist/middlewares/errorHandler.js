"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ERROR HANDLER
const errorHandler = (err, req, res) => {
    if (err) {
        res.locals.error = err;
        const status = err.status || 500;
        res.status(status);
        res.status(status).json({ ...err, success: false });
    }
};
exports.default = errorHandler;
