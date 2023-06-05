import { SchemaType } from '../types/schemaTypes';

const ClassSchema: SchemaType = {
  name: 'class',
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
  uniqueRows: {
    name: 'student_teacher',
    columns: ['teacher_id', 'student_id'],
  }
};

export default ClassSchema;
