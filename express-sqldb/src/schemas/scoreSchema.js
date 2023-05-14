"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScoreSchema = {
    name: 'scores',
    columns: [
        { name: 'scores_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
        {
            name: 'time_of_test',
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
        {
            name: 'subject_id',
            type: 'uuid',
            constarint: 'NOT NULL',
            ref: {
                table: 'subjects',
                column: 'subjects_uid',
            },
        },
        { name: 'score', type: 'DECIMAL(5, 2)', constarint: 'NOT NULL' },
        { name: 'year', type: 'character varying(3)', constarint: 'NOT NULL' },
    ],
};
exports.default = ScoreSchema;
