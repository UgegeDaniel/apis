import { SchemaType } from '../types/schemaTypes';

const ReferenceSchema: SchemaType = {
  name: 'refs',
  columns: [
    { name: 'refs_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
    {
      name: 'verification_ref',
      type: 'character varying(150)',
      constarint: 'NOT NULL',
    },
    {
      name: 'expiry_time',
      type: 'character varying(150)',
      constarint: 'NOT NULL',
    },
    {
      name: 'user_id',
      type: 'uuid',
      constarint: 'NOT NULL',
      ref: {
        table: 'users',
        column: 'users_uid',
      },
    },
  ],
};

export default ReferenceSchema;
