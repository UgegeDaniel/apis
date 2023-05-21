export type columnType = {
  default?: {
    defaultValue: string;
  };
  name: string;
  type: string;
  constarint?: string;
  unique?: boolean;
  ref?: {
    table: string;
    column: string;
  };
  allowedEntries?: string[];
};

export interface SchemaType {
  name: string;
  columns: columnType[];
}

export interface WithDefaultQuery<T> extends SchemaType {
  defaultQuery?: T[];
  extraColumns?: columnType[];
}

export interface WithExtraColumns extends SchemaType {
  extraColumns?: columnType[];
}
