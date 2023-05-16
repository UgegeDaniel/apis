"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const logger_1 = __importDefault(require("../logger"));
const query_1 = __importDefault(require("../models/query"));
const utils_1 = require("../utils");
const adminId = process.env.ADMIN_ROLE_ID;
const questionToInsert = (item, subjectId) => ({
    examYear: item.examyear,
    question: (0, utils_1.escapeSingleQuotes)(item.question),
    section: (0, utils_1.escapeSingleQuotes)(item.section),
    image: (0, utils_1.escapeSingleQuotes)(item.image),
    optiona: (0, utils_1.escapeSingleQuotes)(item.option.a),
    optionb: (0, utils_1.escapeSingleQuotes)(item.option.b),
    optionc: (0, utils_1.escapeSingleQuotes)(item.option.c),
    optiond: (0, utils_1.escapeSingleQuotes)(item.option.d),
    optione: (0, utils_1.escapeSingleQuotes)(item.option.e),
    answer: (0, utils_1.escapeSingleQuotes)(item.answer),
    subjectId,
    contributor_id: adminId,
    examType: (0, utils_1.escapeSingleQuotes)(item.examtype),
});
exports.default = async (data, tableName, subjectId) => {
    const queryStrings = [];
    data.forEach((item) => {
        const itemsToInsert = questionToInsert(item, subjectId);
        const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
        const columnNames = [`${tableName}_uid`, ...Object.keys(itemsToInsert)];
        const queryString = `
          INSERT INTO ${tableName} 
          (${columnNames})
          VALUES (uuid_generate_v4(), '${values}');`;
        queryStrings.push(queryString);
    });
    const insertionQueryString = queryStrings.join('');
    const queryResponse = await (0, query_1.default)(insertionQueryString);
    logger_1.default.info(queryResponse);
};
