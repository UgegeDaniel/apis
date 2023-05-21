import logger from '../logger';
import { ConstraintType } from '../types/queryTypes';
import query from './query';

class BaseModel {
  public tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll = async (): Promise<any> => {
    const queryString = `SELECT * FROM ${this.tableName};`;
    logger.info(`Fetching all rows from ${this.tableName} table`);
    const payload = await query(queryString);
    return payload;
  };

  insert = async (itemsToInsert: {}) => {
    const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
    const columnNames = [
      `${this.tableName}_uid`,
      ...Object.keys(itemsToInsert),
    ];
    const queryString = `INSERT INTO ${this.tableName} (${columnNames})
    VALUES (uuid_generate_v4(), '${values}') RETURNING *;`;
    logger.info(`Inserting into ${this.tableName} table`);
    const payload = await query(queryString);
    return payload;
  };

  findBy = async (searchContraints: {}, selectedColumns?: string[]) => {
    const columnsToReturn = selectedColumns
      ? `${[selectedColumns].join("', '")}`
      : '*';
    const constraints = Object.keys(searchContraints)
      .map((constraint, index) => `${constraint} = $${index + 1}`)
      .join(' AND ');
    const queryString = `SELECT ${columnsToReturn} FROM ${this.tableName} WHERE ${constraints};`;
    logger.info(
      `Returning rows from ${this.tableName} table that match given constraint`,
    );
    const payload = await query(queryString, Object.values(searchContraints));
    return payload;
  };

  // Combine two tables together to create a single table
  // which satisfies a constraint and a condition
  // while optionally adding an additional column in the return
  innerJoin = async (secondaryTable: string, constraint: ConstraintType) => {
    const queryString = `SELECT * FROM ${this.tableName} 
    INNER JOIN ${secondaryTable}
    ON ${this.tableName}.${constraint.secondaryColumn} = ${secondaryTable}.${constraint.columOnSecondaryTable}
    WHERE ${this.tableName}.${constraint.primaryColumn} = '${constraint.primaryValue}' ;`;
    logger.info(
      `Returning rows from ${this.tableName} table and ${secondaryTable} that match given constraint`,
    );
    const payload = await query(queryString);
    return payload;
  };

  updateTable = async (
    rowId: string,
    updates: {},
  ) => {
    const columnsToUpdate = Object.keys(updates)
      .map((update, index) => `${update} = $${index + 1}`)
      .join(', ');
    const queryString = `
    UPDATE ${this.tableName}
    SET ${columnsToUpdate}
    WHERE ${this.tableName}_uid = '${rowId}' RETURNING *;`;
    const payload = await query(queryString, Object.values(updates));
    return payload;
  };
}

export default BaseModel;
