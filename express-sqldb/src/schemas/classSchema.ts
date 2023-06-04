import { SchemaType } from '../types/schemaTypes';

const ClassSchema: SchemaType = {
  name: 'refs',
  columns: [
    { name: 'class_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
    {
      name: 'tutor_id',
      type: 'uuid',
      constarint: 'NOT NULL',
      ref: {
        table: 'users',
        column: 'users_uid',
      },
    },
    {
      name: 'student_id',
      type: 'uuid',
      constarint: 'NOT NULL',
      ref: {
        table: 'users',
        column: 'users_uid',
      },
    },
  ],
};

export default ClassSchema;
