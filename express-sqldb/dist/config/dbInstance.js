"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
const logger_1 = __importDefault(require("../logger"));
class DatabaseInstance {
    constructor(schemas) {
        this.queryStrings = [];
        this.addCreateTableQueryString = () => {
            this.schemas.forEach((schema) => {
                DatabaseInstance.showConsoleMsg(`creating table: ${schema.name} ...`);
                const queryString = `
        CREATE TABLE IF NOT EXISTS ${schema.name} (${DatabaseInstance.getSchema(schema)});`;
                this.queryStrings.push(queryString);
            });
        };
        this.addUniqueContraintQueryString = () => {
            this.schemas.forEach((schema) => {
                schema.columns.forEach((column) => {
                    const msg = `adding unique constraint to column: ${schema.name}.${column.name}...`;
                    column.unique && DatabaseInstance.showConsoleMsg(msg);
                    const queryString = column.unique
                        ? `
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_constraint 
              WHERE conname = '${schema.name}_${column.name}_unique_key') THEN
              ALTER TABLE ONLY ${schema.name} 
                ADD CONSTRAINT ${schema.name}_${column.name}_unique_key UNIQUE(${column.name});
            END IF;
          END;
          $$;`
                        : '';
                    queryString && this.queryStrings.push(queryString);
                });
            });
        };
        this.addRelationQueryString = () => {
            this.schemas.forEach((schema) => {
                schema.columns.forEach((column) => {
                    const msg = `relating ${schema.name} to ${column.ref?.table}...`;
                    column.ref && DatabaseInstance.showConsoleMsg(msg);
                    const queryString = column.ref
                        ? `
          DO $$
            BEGIN
              IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '${column.name}_fkey') THEN
                ALTER TABLE ONLY ${schema.name} 
                  ADD CONSTRAINT ${column.name}_fkey FOREIGN KEY (${column.name}) 
                  REFERENCES ${column.ref.table}(${column.ref.column}) ON DELETE CASCADE;
              END IF;
            END;
          $$;`
                        : '';
                    queryString && this.queryStrings.push(queryString);
                });
            });
        };
        this.addAllowedEntriesCheckQueryString = () => {
            this.schemas.forEach((schema) => {
                schema.columns.forEach((column) => {
                    const msg = `running checks on ${column.name}...`;
                    column.allowedEntries && DatabaseInstance.showConsoleMsg(msg);
                    const queryString = column.allowedEntries
                        ? `
          DO $$
            BEGIN
              IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '${schema.name}_type') THEN
                ALTER TABLE ONLY ${schema.name} 
                  ADD CONSTRAINT ${schema.name}_type 
                    CHECK(${column.name} = '${column.allowedEntries[0]}'
                      OR ${column.name}= '${column.allowedEntries[1]}');
              END IF;
            END;
          $$;`
                        : '';
                    queryString && this.queryStrings.push(queryString);
                });
            });
        };
        this.addDefaultQueryString = () => {
            this.schemas.forEach((schema) => {
                const msg = 'running default querries ...';
                schema.defaultQuery && DatabaseInstance.showConsoleMsg(msg);
                schema.defaultQuery &&
                    schema.defaultQuery.forEach((defQuery) => {
                        const values = `${[...Object.values(defQuery)].join("', '")}`;
                        const columnNames = [`${schema.name}_uid`, ...Object.keys(defQuery)];
                        const queryString = schema.defaultQuery
                            ? `INSERT INTO ${schema.name} (${columnNames})
              SELECT uuid_generate_v4(), '${values}'
              WHERE NOT EXISTS (
                  SELECT name FROM ${schema.name} WHERE name = '${defQuery.name}'
              );`
                            : '';
                        queryString && this.queryStrings.push(queryString);
                    });
            });
        };
        this.getRootQueryString = () => this.queryStrings.join('');
        this.schemas = schemas;
        this.addCreateTableQueryString();
        this.addUniqueContraintQueryString();
        this.addRelationQueryString();
        this.addAllowedEntriesCheckQueryString();
        this.addDefaultQueryString();
    }
}
DatabaseInstance.getSchema = (schema) => schema.columns
    .map((column) => `${column.name} ${column.type} ${column.constarint || ''}`)
    .toString();
DatabaseInstance.showConsoleMsg = (msg) => {
    logger_1.default.info(msg);
};
exports.default = DatabaseInstance;
