"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = void 0;
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-unresolved, import/extensions
const connectDB_1 = __importDefault(require("../connectDB"));
const query = async (queryString) => {
    let data = null;
    let error = null;
    try {
        const { rows } = await connectDB_1.default.query(queryString);
        error = null;
        data = rows;
    }
    catch (err) {
        error = err;
    }
    return { error, data };
};
const select = (arr, field) => arr.find((a) => a[field.col] === field.val);
exports.select = select;
class BaseModel {
    constructor(tableName) {
        this.getAll = async () => {
            const queryString = `SELECT * FROM ${this.tableName};`;
            const payload = await query(queryString);
            return payload;
        };
        this.insert = async (itemsToInsert) => {
            const columnNames = Object.keys(itemsToInsert).join(', ');
            const values = `${Object.values(itemsToInsert).join("', '")}`;
            const queryString = `INSERT INTO ${this.tableName} (${this.tableName}_uid, ${columnNames}) 
    VALUES (uuid_generate_v4(), '${values}') RETURNING *`;
            const payload = await query(queryString);
            return payload;
        };
        this.findBy = async (search) => {
            const { key, value, key2, value2, } = search;
            const queryString = key2
                ? `SELECT * FROM ${this.tableName} WHERE ${key} = '${value}' AND ${key2} = '${value2}'`
                : `SELECT * FROM ${this.tableName} WHERE ${key} = '${value}';`;
            const payload = await query(queryString);
            return payload;
        };
        this.innerJoin = async (secondTable, condition) => {
            const queryString = `SELECT ${this.tableName}.*, 
    ${secondTable}.${condition.col3} as ${secondTable}_${condition.col3}
    FROM ${this.tableName} 
    JOIN ${secondTable} 
    ON ${this.tableName}.${condition.col1} = ${secondTable}.${condition.col2}`;
            const payload = await query(queryString);
            return payload;
        };
        this.tableName = tableName;
    }
}
exports.default = BaseModel;
