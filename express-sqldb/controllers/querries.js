const querries = {
    getAllSubjectsQuery: "SELECT * FROM subjects",
    addNewSubjectsQuery: "INSERT INTO subjects (subject_uid, name) VALUES (uuid_generate_v4(), $1) RETURNING *",
    addStudentQuery: "INSERT INTO students (student_uid, name, email, password, admin) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *"
}

module.exports = querries