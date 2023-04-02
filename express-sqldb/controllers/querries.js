const querries = {
    getAllSubjects: "SELECT * FROM subjects",
    addNewSubjects: "INSERT INTO subjects (subject_uid, name) VALUES (uuid_generate_v4(), $1) RETURNING *"
}

module.exports = querries