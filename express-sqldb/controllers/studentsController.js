const pool = require('../connectDB');
const { addStudentQuery } = require('./querries');
const {createToken} = require('../middlewares/auth')

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\""
}

const signUp = async (req, res) => {
    const { email, password, name, admin } = req.body;
    try {
        const { rows } = await pool.query(addStudentQuery, [name, email, password, admin]);
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return res.status(201).json({ newStudent: rows[0], token })
    } catch (error) {
        if (error.message = errMsg.userExists) {
            return res.status(500).json({ success: false, message: "User with that email already exists" })
        }
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query("SELECT * FROM students WHERE email = $1;", [email]);
        if(!rows[0]){
            return res.status(404).json({ success: false, message: `User with email: ${email} not found`})
        }
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return res.status(201).json({ newStudent: rows[0], token })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    signUp,
    signIn
}