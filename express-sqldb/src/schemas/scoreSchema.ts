import { SchemaType } from "../types/types";

const ScoreSchema: SchemaType = {
    name: 'scores',
    columns: [
        { name: 'scores_uid', type: 'uuid', constarint: 'PRIMARY KEY' },
        { name: 'time_of_test', type: 'character varying(150)', constarint: 'NOT NULL' },
        {
            name: 'user_id', type: 'uuid', constarint: 'NOT NULL', ref: {
                table: 'users',
                column: 'users_uid',
            }
        },
        {
            name: 'subject_id', type: 'uuid', constarint: 'NOT NULL', ref: {
                table: 'subjects',
                column: 'subjects_uid'
            }
        },
        { name: 'score', type: 'DECIMAL(5, 2)', constarint: 'NOT NULL' },
    ],
}

export default ScoreSchema;