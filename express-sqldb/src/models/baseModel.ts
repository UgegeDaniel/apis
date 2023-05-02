import query from './query';

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

  findBy = async (searchContraints: {}) => {
    const constraints = Object.keys(searchContraints).map(
      (constraint, index) => (`${constraint} = $${index + 1}`)
    ).join(' AND ');
    const queryString = `SELECT * FROM ${this.tableName} WHERE ${constraints};`;
    const payload = await query(queryString, Object.values(searchContraints));
    return payload;
  };

  // innerJoin = async (secondTable: string, condition: conditionType) => {
  //   const queryString = `SELECT ${this.tableName}.*, 
  //   ${secondTable}.${condition.col3} as ${secondTable}_${condition.col3}
  //   FROM ${this.tableName} 
  //   JOIN ${secondTable} 
  //   ON ${this.tableName}.${condition.col1} = ${secondTable}.${condition.col2}`;
  //   const payload = await query(queryString);
  //   return payload;
  // };
}

export default BaseModel;
