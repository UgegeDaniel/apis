/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-unresolved, import/extensions
import pool from '../connectDB';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { errorType, searchObj, conditionType } from '../types/index';

const query = async (queryString: string): Promise<any> => {
  let data = null;
  let error : errorType = null;
  try {
    const { rows } = await pool.query(queryString);
    error = null;
    data = rows;
  } catch (err: errorType | unknown) {
    error = err;
  }
  return { error, data };
};

type fieldType = {
  col: string;
  val: string
}
export const select = (
  arr: Array<any>,
  field: fieldType,
) => arr.find((a) => a[field.col] === field.val);

class BaseModel {
  public tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll = async (): Promise<any> => {
    const queryString = `SELECT * FROM ${this.tableName};`;
    const payload = await query(queryString);
    return payload;
  };

  insert = async (itemsToInsert: {}) => {
    const columnNames = Object.keys(itemsToInsert).join(', ');
    const values = `${Object.values(itemsToInsert).join("', '")}`;
    const queryString = `INSERT INTO ${this.tableName} (${this.tableName}_uid, ${columnNames}) 
    VALUES (uuid_generate_v4(), '${values}') RETURNING *`;
    const payload = await query(queryString);
    return payload;
  };

  findBy = async (search: searchObj) => {
    const {
      key, value, key2, value2,
    } = search;
    const queryString = key2
      ? `SELECT * FROM ${this.tableName} WHERE ${key} = '${value}' AND ${key2} = '${value2}'`
      : `SELECT * FROM ${this.tableName} WHERE ${key} = '${value}';`;
    const payload = await query(queryString);
    return payload;
  };

  innerJoin = async (secondTable: string, condition: conditionType) => {
    const queryString = `SELECT ${this.tableName}.*, 
    ${secondTable}.${condition.col3} as ${secondTable}_${condition.col3}
    FROM ${this.tableName} 
    JOIN ${secondTable} 
    ON ${this.tableName}.${condition.col1} = ${secondTable}.${condition.col2}`;
    const payload = await query(queryString);
    return payload;
  };
}

export default BaseModel;
