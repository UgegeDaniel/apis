"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeSingleQuotes = void 0;
/* eslint-disable linebreak-style */
function escapeSingleQuotes(str) {
    return str.replace(/'/g, "''");
}
exports.escapeSingleQuotes = escapeSingleQuotes;
