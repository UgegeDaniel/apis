const querries = {
    getAllSubjectsQuery: "SELECT * FROM subjects",
    addNewSubjectsQuery: "INSERT INTO subjects (subject_uid, name) VALUES (uuid_generate_v4(), $1) RETURNING *",
    signupQuery: "INSERT INTO students (student_uid, name, email, password, admin) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *",
    signinQuery: "SELECT * FROM students WHERE email = $1;",
}

module.exports = querries