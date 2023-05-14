import { WithDefaultQuery } from '../types/schemaTypes';

const RoleSchema: WithDefaultQuery<{ name: string }> = {
  name: 'roles',
  columns: [
    { name: 'roles_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
    {
      name: 'name',
      type: 'character varying(150)',
      constarint: 'NOT NULL',
      allowedEntries: ['Admin', 'Student'],
      unique: true,
    },
  ],
  defaultQuery: [{ name: 'Admin' }, { name: 'Student' }],
};

export default RoleSchema;
