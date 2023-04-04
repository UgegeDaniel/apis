const crypto = require('crypto'); //default to nodeJS 
const pool = require('../connectDB');
const { signupQuery, signinQuery } = require('./querries');
const { createToken } = require('../middlewares/auth')

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\""
}

const salt = crypto.randomBytes(32).toString('hex');
const genPassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'SHA1').toString('hex');
    return hash
};

const validatePassword = (password, hash) => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'SHA1').toString('hex');
    return hash === verifyHash;
};

const signUp = async (req, res) => {
    const { email, password, name, admin } = req.body;
    try {
        const hash = genPassword(password)
        const { rows } = await pool.query(signupQuery, [name, email, hash, admin]);
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
        const { rows } = await pool.query(signinQuery, [email]);
        if (!rows[0]) {
            return res.status(404).json({ success: false, message: `User with email: ${email} not found` })
        }
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return validatePassword(password, rows[0].password)
            ? res.status(201).json({ newStudent: rows[0], token })
            : res.status(403).json({ success: false, message: "Password incorrect" }) 
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    signUp,
    signIn
}