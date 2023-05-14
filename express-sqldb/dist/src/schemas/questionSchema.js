"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuestionSchema = {
    name: 'questions',
    columns: [
        { name: 'questions_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
        {
            name: 'question',
            type: 'character varying(600)',
            constarint: 'NOT NULL',
        },
        { name: 'optiona', type: 'character varying(600)', constarint: 'NOT NULL' },
        { name: 'optionb', type: 'character varying(600)', constarint: 'NOT NULL' },
        { name: 'optionc', type: 'character varying(600)', constarint: 'NOT NULL' },
        { name: 'optiond', type: 'character varying(600)', constarint: 'NOT NULL' },
        { name: 'optione', type: 'character varying(600)', constarint: 'NOT NULL' },
        { name: 'section', type: 'character varying(600)' },
        { name: 'image', type: 'character varying(600)' },
        { name: 'answer', type: 'character varying(10)', constarint: 'NOT NULL' },
        { name: 'examType', type: 'character varying(100)' },
        {
            name: 'examYear',
            type: 'character varying(100)',
            constarint: 'NOT NULL',
        },
        {
            name: 'subjectid',
            type: 'uuid',
            constarint: 'NOT NULL',
            ref: {
                table: 'subjects',
                column: 'subjects_uid',
            },
        },
        {
            name: 'contributor_id',
            type: 'uuid',
            constarint: 'NOT NULL',
            ref: {
                table: 'users',
                column: 'users_uid',
            },
        },
    ],
};
exports.default = QuestionSchema;
