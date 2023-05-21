"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const query_1 = __importDefault(require("./query"));
class BaseModel {
    constructor(tableName) {
        this.getAll = async () => {
            const queryString = `SELECT * FROM ${this.tableName};`;
            logger_1.default.info(`Fetching all rows from ${this.tableName} table`);
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
            logger_1.default.info(`Inserting into ${this.tableName} table`);
            const payload = await (0, query_1.default)(queryString);
            return payload;
        };
        this.findBy = async (searchContraints, selectedColumns) => {
            const columnsToReturn = selectedColumns
                ? `${[selectedColumns].join("', '")}`
                : '*';
            const constraints = Object.keys(searchContraints)
                .map((constraint, index) => `${constraint} = $${index + 1}`)
                .join(' AND ');
            const queryString = `SELECT ${columnsToReturn} FROM ${this.tableName} WHERE ${constraints};`;
            logger_1.default.info(`Returning rows from ${this.tableName} table that match given constraint`);
            const payload = await (0, query_1.default)(queryString, Object.values(searchContraints));
            return payload;
        };
        // Combine two tables together to create a single table
        // which satisfies a constraint and a condition
        // while optionally adding an additional column in the return
        this.innerJoin = async (secondaryTable, constraint) => {
            const queryString = `SELECT * FROM ${this.tableName} 
    INNER JOIN ${secondaryTable}
    ON ${this.tableName}.${constraint.secondaryColumn} = ${secondaryTable}.${constraint.columOnSecondaryTable}
    WHERE ${this.tableName}.${constraint.primaryColumn} = '${constraint.primaryValue}' ;`;
            logger_1.default.info(`Returning rows from ${this.tableName} table and ${secondaryTable} that match given constraint`);
            const payload = await (0, query_1.default)(queryString);
            return payload;
        };
        this.updateTable = async (rowId, updates) => {
            const columnsToUpdate = Object.keys(updates)
                .map((update, index) => `${update} = $${index + 1}`)
                .join(', ');
            const queryString = `
    UPDATE ${this.tableName}
    SET ${columnsToUpdate}
    WHERE ${this.tableName}_uid = '${rowId}' RETURNING *;`;
            const payload = await (0, query_1.default)(queryString, Object.values(updates));
            return payload;
        };
        this.tableName = tableName;
    }
}
exports.default = BaseModel;
