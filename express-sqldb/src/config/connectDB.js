"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var parsed = require('dotenv').config().parsed;
var pool = new pg_1.Pool({
    user: parsed.DB_USER,
    password: parsed.DB_PASSWORD,
    host: parsed.DB_HOST,
    port: Number(parsed.DB_PORT),
    database: parsed.DB_DATABASE,
});
exports.default = pool;
