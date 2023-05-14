"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleSchema = {
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
exports.default = RoleSchema;
