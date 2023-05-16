/* eslint-disable linebreak-style */
export function escapeSingleQuotes(str: string): string {
  return str.replace(/'/g, "''");
}
