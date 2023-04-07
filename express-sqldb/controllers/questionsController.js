const pool = require('../connectDB');
const { addNewQuestionsQuery,
    getAllSubjectsQuery,
    addNewSubjectsQuery,
    getSubjectQuery, 
    getQuestionsQuerry} = require('../utils/querries');
const {getQuestionsField} = require('../utils');

const getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await pool.query(getAllSubjectsQuery)
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
            const newSubject = await pool.query(addNewSubjectsQuery, [subject.toLowerCase()]);
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
        const questionFields = getQuestionsField(req)
        try {
            const newQuestion = await pool.query(addNewQuestionsQuery, questionFields);
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
        const { rows } = await pool.query(getSubjectQuery, [subject.toLowerCase()])
        const questions = await pool.query(getQuestionsQuerry, [rows[0].subject_uid, year])
        if (questions.rows.length === 0) {
            return res.status(200).json({ success: true, payload: [], msg: "No questions found" })

        }
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