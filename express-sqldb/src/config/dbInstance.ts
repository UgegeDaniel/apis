/* eslint-disable no-unused-expressions */
import logger from '../logger';
import { WithDefaultQuery, WithExtraColumns } from '../types/schemaTypes';

class DatabaseInstance {
  public schemas: WithDefaultQuery<{ name: string }>[];

  public queryStrings: string[] = [];

  constructor(schemas: WithDefaultQuery<{ name: string }>[]) {
    this.schemas = schemas;
    this.addCreateTableQueryString();
    this.addExtraColumnsQueryString();
    this.addUniqueContraintQueryString();
    this.addRelationQueryString();
    this.addAllowedEntriesCheckQueryString();
    this.addDefaultQueryString();
  }

  static getColumnSchema = (
    schema: WithExtraColumns,
    extraColumn?: boolean,
  ) => {
    if (extraColumn) {
      return schema.extraColumns
        ?.map(
          (column) => `ADD IF NOT EXISTS ${column.name} ${column.type} ${
            column.constarint || ''
          }`,
        )
        .toString();
    }
    if (!extraColumn) {
      return schema.columns
        .map((column) => {
          if (column.default) {
            return `${column.name} ${column.type} 
          'DEFAULT' ${column.default.defaultValue} ${column.constarint || ''}`;
          }
          if (!column.default) return `${column.name} ${column.type} ${column.constarint || ''}`;
        })
        .toString();
    }
  };

  static showConsoleMsg = (msg: string) => {
    logger.info(msg);
  };

  private addCreateTableQueryString = () => {
    this.schemas.forEach((schema) => {
      DatabaseInstance.showConsoleMsg(`creating table: ${schema.name} ...`);
      const queryString = `
        CREATE TABLE IF NOT EXISTS ${
  schema.name
} (${DatabaseInstance.getColumnSchema(schema)});`;
      this.queryStrings.push(queryString);
    });
  };

  private addExtraColumnsQueryString = () => {
    this.schemas.forEach((schema) => {
      const msg = 'adding extra columns...';
      schema.extraColumns && DatabaseInstance.showConsoleMsg(msg);
      schema.extraColumns
        && schema.extraColumns.forEach(() => {
          const queryString = schema.extraColumns
            ? `ALTER TABLE ${schema.name} ${DatabaseInstance.getColumnSchema(
              schema,
              true,
            )};`
            : '';
          queryString && this.queryStrings.push(queryString);
        });
    });
  };

  private addUniqueContraintQueryString = () => {
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

  private addRelationQueryString = () => {
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

  private addAllowedEntriesCheckQueryString = () => {
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

  private addDefaultQueryString = () => {
    this.schemas.forEach((schema) => {
      const msg = 'running default querries ...';
      schema.defaultQuery && DatabaseInstance.showConsoleMsg(msg);
      schema.defaultQuery
        && schema.defaultQuery.forEach((defQuery) => {
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

  getRootQueryString = () => this.queryStrings.join('');
}
export default DatabaseInstance;
