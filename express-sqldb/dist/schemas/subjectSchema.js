"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubjectSchema = {
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
exports.default = SubjectSchema;
