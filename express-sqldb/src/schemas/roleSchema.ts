import { WithDefaultQuery } from '../types/schemaTypes';

const RoleSchema: WithDefaultQuery<{ role_name: string }> = {
  name: 'roles',
  columns: [
    { name: 'roles_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
    {
      name: 'role_name',
      type: 'character varying(150)',
      constarint: 'NOT NULL',
      allowedEntries: ['Admin', 'Tutor', 'Student'],
      unique: true,
    },
  ],
  defaultQuery: [{ role_name: 'Admin' }, { role_name: 'Tutor' }, { role_name: 'Student' }],
};

export default RoleSchema;
