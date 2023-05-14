"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query"));
class BaseModel {
    constructor(tableName) {
        this.getAll = async () => {
            const queryString = `SELECT * FROM ${this.tableName};`;
            const payload = await (0, query_1.default)(queryString);
            return payload;
        };
        this.insert = async (itemsToInsert) => {
            const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
            const columnNames = [
                `${this.tableName}_uid`,
                ...Object.keys(itemsToInsert),
            ];
            const queryString = `INSERT INTO ${this.tableName} (${columnNames})
    VALUES (uuid_generate_v4(), '${values}') RETURNING *;`;
            const payload = await (0, query_1.default)(queryString);
            return payload;
        };
        this.findBy = async (searchContraints, selectedColumns) => {
            const constraints = Object.keys(searchContraints)
                .map((constraint, index) => `${constraint} = $${index + 1}`)
                .join(' AND ');
            const columnsToReturn = selectedColumns
                ? `${[selectedColumns].join("', '")}`
                : '*';
            const queryString = `SELECT ${columnsToReturn} FROM ${this.tableName} WHERE ${constraints};`;
            const payload = await (0, query_1.default)(queryString, Object.values(searchContraints));
            return payload;
        };
        // Combine two tables together to create a single table with
        // which satisfies a constraint and a condition
        // while optionally adding an additional column in the return
        this.innerJoin = async (secondaryTable, constraint) => {
            const queryString = `SELECT * FROM ${this.tableName} 
    INNER JOIN ${secondaryTable}
    ON ${this.tableName}.${constraint.secondaryColumn} = ${secondaryTable}.${constraint.columOnSecondaryTable}
    WHERE ${this.tableName}.${constraint.primaryColumn} = '${constraint.primaryValue}' ;`;
            const payload = await (0, query_1.default)(queryString);
            return payload;
        };
        this.tableName = tableName;
    }
}
exports.default = BaseModel;
