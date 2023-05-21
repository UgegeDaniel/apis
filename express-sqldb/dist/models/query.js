"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../config/connectDB"));
const logger_1 = __importDefault(require("../logger"));
const apiErrorType_1 = require("../types/apiErrorType");
const query = async (queryString, options) => {
    try {
        const { rows: data } = await connectDB_1.default.query(queryString, options);
        return data;
    }
    catch (err) {
        const apiError = new apiErrorType_1.ApiError(400, "Couldn't perform action");
        if (err?.code === '23505')
            throw apiError;
        logger_1.default.error(err);
        throw new apiErrorType_1.ApiError(500, 'Something went wrong');
    }
};
exports.default = query;
