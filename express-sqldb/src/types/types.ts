export interface TokenPayload {
  userId: string;
  role: string;
}

//SCHEMA TYPES 
export type columnType = {
  name: string;
  type: string;
  constarint?: string;
  unique?: boolean;
  ref?: {
    table: string;
    column: string;
  },
  allowedEntries?: string[];
}

export interface SchemaType{
  name: string;
  columns: columnType[],
}

export interface WithDefaultQuery<T> extends SchemaType {
  defaultQuery?: T[];
}

//QUERY TYPES
export type ConstraintType = {
  primaryColumn: string;
  primaryValue: string;
  secondaryColumn: string;
  columOnSecondaryTable: string;
}

export type UserType  = {
  email: string,
  name?: string,
  password: string,
};