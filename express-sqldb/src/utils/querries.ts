const querries = {
  getAllSubjectsQuery: 'SELECT * FROM subjects',
  addNewSubjectsQuery:
    'INSERT INTO subjects (subject_uid, name) VALUES (uuid_generate_v4(), $1) RETURNING *',
  signupQuery:
    "INSERT INTO students (student_uid, name, email, password, role_id) VALUES (uuid_generate_v4(), $1, $2, $3, '8b66f245-a8d2-41c1-9a55-070a83d4ba3f') RETURNING *",
  signinQuery: 'SELECT * FROM students WHERE email = $1;',
  addNewQuestionsQuery:
    'INSERT INTO questions (questions_uid, examYear, question, instruction, optionA, optionB, optionC, optionD, optionE, subjectId) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
  getSubjectQuery: 'SELECT * FROM subjects WHERE name = $1',
  getQuestionsQuerry:
    'SELECT * FROM questions WHERE subjectId = $1 AND examYear = $2',
  roleQuery: 'SELECT * FROM roles WHERE role_uid = $1',
};
export default querries;
