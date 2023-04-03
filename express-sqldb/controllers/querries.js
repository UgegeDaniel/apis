const querries = {
    getAllSubjectsQuery: "SELECT * FROM subjects",
    addNewSubjectsQuery: "INSERT INTO subjects (subject_uid, name) VALUES (uuid_generate_v4(), $1) RETURNING *",
    signupQuery: "INSERT INTO students (student_uid, name, email, password, admin) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *;",
    signinQuery: "SELECT * FROM students WHERE email = $1;",
    addNewQuestionsQuery: "INSERT INTO questions (questions_uid, exam_year, question, instruction, option_a, option_b, option_c, option_d, option_e, subject_id) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;"
}

module.exports = querries