import { SchemaType } from '../types/schemaTypes';

const SubjectSchema: SchemaType = {
  name: 'subjects',
  columns: [
    { name: 'subjects_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
    {
      name: 'name',
      type: 'character varying(20)',
      constarint: 'NOT NULL',
      unique: true,
    },
  ],
};

export default SubjectSchema;
