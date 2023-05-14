"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../models/query"));
exports.default = async (dbInstance, cb) => {
    const rootQueryString = dbInstance.getRootQueryString();
    await (0, query_1.default)(rootQueryString);
    cb();
};
