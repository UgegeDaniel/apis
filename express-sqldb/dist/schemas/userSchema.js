"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema = {
    name: 'users',
    columns: [
        { name: 'users_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
        {
            name: 'email',
            type: 'character varying(150)',
            constarint: 'NOT NULL',
            unique: true,
        },
        { name: 'name', type: 'character varying(150)', constarint: 'NOT NULL' },
        {
            name: 'password',
            type: 'character varying(150)',
            constarint: 'NOT NULL',
        },
        {
            name: 'role_id',
            type: 'uuid',
            constarint: 'NOT NULL',
            ref: {
                table: 'roles',
                column: 'roles_uid',
            },
        },
    ],
    extraColumns: [
        {
            name: 'verified',
            type: 'boolean',
            // constarint: 'NOT NULL',
            default: {
                defaultValue: 'false'
            }
        },
    ],
};
exports.default = UserSchema;
