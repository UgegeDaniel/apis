const crypto = require('crypto'); //default to nodeJS 
const pool = require('../connectDB');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { signupQuery, signinQuery } = require('../utils/querries');
const { createToken } = require('../middlewares/auth')
const salt = process.env.BCRYPT_SALT

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\"",

}
const errorResponse = (res, code, msg) => {
    console.error(msg)
    return res.status(code).json({ success: false, msg })
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (error) {
        console.error(err.message)
    }
}

const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match;
}

const signUp = async (req, res) => {
    const { email, password, name, admin } = req.body;
    const hashedPassword = await hashPassword(password)
    try {
        const { rows } = await pool.query(signupQuery, [name, email, hashedPassword, admin]);
        const token = createToken({ studentId: rows[0].student_uid })
        return res.status(201).json({ newStudent: rows[0], token })
    } catch (error) {
        if (error.message = errMsg.userExists) {
            return errorResponse(res, 500, "User already exists with that email ")
        }
        return errorResponse(res, 500, error.message)
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query(signinQuery, [email]);
        if (!rows[0]) {
            return errorResponse(res, 404, `User with email: ${email} not found`)
        }
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return validatePassword(password, rows[0].password)
            ? res.status(201).json({ newStudent: rows[0], token })
            : errorResponse(res, 403, "Password incorrect")
    } catch (error) {
        console.error(error.message)
        return errorResponse(res, 500, error.message)
    }
}

module.exports = {
    signUp,
    signIn
}