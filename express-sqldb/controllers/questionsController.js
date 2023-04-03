const pool = require('../connectDB');
const querries = require('./querries');

const getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await pool.query(querries.getAllSubjectsQuery)
        res.json(allSubjects.rows)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const addNewSubject = async (req, res) => {
    try {
        const { subject } = req.body;
        const newSubject = await pool.query(querries.addNewSubjectsQuery, [subject]);
        return res.status(201).json(newSubject.rows[0])
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    getAllSubjects,
    addNewSubject,
}