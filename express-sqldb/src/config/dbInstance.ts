import { SchemaType, WithDefaultQuery } from "../types/types";
import colors from 'colors/safe';

class DatabaseInstance {
  public schemas: WithDefaultQuery<{ name: string }>[];
  public queryStrings: string[] = [];

  constructor(schemas: WithDefaultQuery<{ name: string }>[]) {
    this.schemas = schemas;
  };

  static getSchema = (schema: SchemaType) => schema.columns.map((schema) =>
    `${schema.name} ${schema.type} ${schema.constarint || ''}`
  ).toString();

  static showConsoleMsg = (msg: string) => {
    console.log(colors.cyan(msg));
  }

  private createTable = () => {
    this.schemas.forEach((schema) => {
      DatabaseInstance.showConsoleMsg(`creating table: ${schema.name} ...`)
      const queryString = `
        CREATE TABLE IF NOT EXISTS ${schema.name} ( ${DatabaseInstance.getSchema(schema)});
        `
      this.queryStrings.push(queryString);
    });
  };

  private addUnique = () => {
    this.schemas.forEach((schema) => {
      schema.columns.forEach((column) => {
        const msg = `adding unique constraint to column: ${schema.name}.${column.name}...`
        column.unique && DatabaseInstance.showConsoleMsg(msg);
        const queryString = column.unique
          ? `
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '${schema.name}_${column.name}_unique_key') THEN
              ALTER TABLE ONLY ${schema.name} 
                ADD CONSTRAINT ${schema.name}_${column.name}_unique_key UNIQUE(${column.name});
            END IF;
          END;
          $$;`
          : ''
        queryString && this.queryStrings.push(queryString)
      })
    });
  };

  private addRelation = () => {
    this.schemas.forEach((schema) => {
      schema.columns.forEach((column) => {
        const msg = `relating ${schema.name} to ${column.ref?.table}...`
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
          : ''
        queryString && this.queryStrings.push(queryString)
      })
    });
  };

  private allowedEntriesCheck = () => {
    this.schemas.forEach((schema) => {
      schema.columns.forEach((column) => {
        const msg = `running checks on ${column.name}...`
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
          : ''
        queryString && this.queryStrings.push(queryString)
      })
    });
  };

  private runDefaultQuery = () => {
    this.schemas.forEach((schema) => {
      const msg = `running default querries ...`
      schema.defaultQuery && DatabaseInstance.showConsoleMsg(msg);
      schema.defaultQuery && schema.defaultQuery.forEach((defQuery) => {
        const values = `${[...Object.values(defQuery)].join("', '")}`;
        const columnNames = [`${schema.name}_uid`, ...Object.keys(defQuery)];
        const queryString = schema.defaultQuery
          ? `INSERT INTO ${schema.name} (${columnNames})
              SELECT uuid_generate_v4(), '${values}'
              WHERE NOT EXISTS (
                  SELECT name FROM ${schema.name} WHERE name = '${defQuery.name}'
              );`
          : '';
        queryString && this.queryStrings.push(queryString)
      })
    });
  }
  getRootQueryString = () => {
    this.createTable();
    this.addUnique();
    this.addRelation();
    this.allowedEntriesCheck();
    this.runDefaultQuery();
    return this.queryStrings.join('');
  }
}

export default DatabaseInstance;
