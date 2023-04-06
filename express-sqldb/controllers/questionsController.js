const pool = require('../connectDB');
const querries = require('../utils/querries');

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
    if (req.role === 'Admin') {
        try {
            const { subject } = req.body;
            const newSubject = await pool.query(querries.addNewSubjectsQuery, [subject.toLowerCase()]);
            return res.status(201).json(newSubject.rows[0])
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    return res.status(403).json({ success: false, message: "You are not authorized make this request" })
}

const addNewQuestions = async (req, res) => {
    if (req.role === 'Admin') {
        try {
            const { exam_year, question, instruction, option_a, option_b, option_c, option_d, option_e, subject_id } = req.body;
            const questionFields = [exam_year, question, instruction, option_a, option_b, option_c, option_d, option_e, subject_id]
            const newQuestion = await pool.query(querries.addNewQuestionsQuery, questionFields);
            return res.status(201).json(newQuestion.rows[0])
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    return res.status(403).json({ success: false, message: "You are not authorized make this request" })
}

const getQuestions = async (req, res) => {
    const { subject, year } = req.query;
    try {
        const { rows } = await pool.query(querries.getSubjectQuery, [subject.toLowerCase()])
        const subject_id = rows[0].subject_uid;
        const questions = await pool.query(querries.getQuestionsQuerry, [subject_id, year])
        const withSubjectName = questions.rows.map((question) => {
            return { ...question, subject }
        });
        return res.status(200).json({ success: true, payload: withSubjectName })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = {
    getAllSubjects,
    addNewSubject,
    addNewQuestions,
    getQuestions
}