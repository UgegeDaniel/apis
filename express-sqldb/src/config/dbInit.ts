import query from '../models/query';
import DatabaseInstance from './dbInstance';

export default async (dbInstance: DatabaseInstance, cb: () => void) => {
  const rootQueryString = dbInstance.getRootQueryString();
  await query(rootQueryString);
  cb();
};
