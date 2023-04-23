"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { parsed } = require('dotenv').config();
const pool = new pg_1.Pool({
    user: parsed.DB_USER,
    password: parsed.DB_PASSWORD,
    host: parsed.DB_HOST,
    port: Number(parsed.DB_PORT),
    database: parsed.DB_DATABASE,
});
exports.default = pool;
