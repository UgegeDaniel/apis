import query from './query';
import { ConstraintType } from '../types/types';

class BaseModel {
  public tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  };

  getAll = async (): Promise<any> => {
    const queryString = `SELECT * FROM ${this.tableName};`;
    const payload = await query(queryString);
    return payload;
  };

  insert = async (itemsToInsert: {}) => {
    const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
    const columnNames = [`${this.tableName}_uid`, ...Object.keys(itemsToInsert)];
    const queryString = `INSERT INTO ${this.tableName} (${columnNames})
    VALUES (uuid_generate_v4(), '${values}') RETURNING *;`;
    const payload = await query(queryString);
    return payload;
  };

  findBy = async (searchContraints: {}, selectedColumns?: string[]) => {
    const constraints = Object.keys(searchContraints).map(
      (constraint, index) => (`${constraint} = $${index + 1}`)
    ).join(' AND ');
    const columnsToReturn = selectedColumns ? `${[selectedColumns].join("', '")}` : "*"
    const queryString = `SELECT ${columnsToReturn} FROM ${this.tableName} WHERE ${constraints};`;
    const payload = await query(queryString, Object.values(searchContraints));
    return payload;
  };

  //Combine two tables together to create a single table with which satisfies a constraint(common column) and a condition while optionally adding an additional column in the return
  innerJoin = async (secondaryTable: string, constraint: ConstraintType) => {
    const queryString = `SELECT DISTINCT * FROM ${this.tableName} 
    INNER JOIN ${secondaryTable}
    ON ${this.tableName}.${constraint.secondaryColumn} = ${secondaryTable}.${constraint.columOnSecondaryTable}
    WHERE ${this.tableName}.${constraint.primaryColumn} = '${constraint.primaryValue}' ;`
    const payload = await query(queryString);
    return payload;
  };
}

export default BaseModel;
