const crypto = require('crypto'); //default to nodeJS 
const pool = require('../connectDB');
<<<<<<< HEAD
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
=======
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
>>>>>>> 4c0fc6cf8fbf430bb1e5ed7214b91bd1f02d0dd6
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query(signinQuery, [email]);
        if (!rows[0]) {
<<<<<<< HEAD
            return errorResponse(res, 404, `User with email: ${email} not found`)
=======
            return res.status(404).json({ success: false, message: `User with email: ${email} not found` })
>>>>>>> 4c0fc6cf8fbf430bb1e5ed7214b91bd1f02d0dd6
        }
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return validatePassword(password, rows[0].password)
            ? res.status(201).json({ newStudent: rows[0], token })
<<<<<<< HEAD
            : errorResponse(res, 403, "Password incorrect")
    } catch (error) {
        console.error(error.message)
        return errorResponse(res, 500, error.message)
=======
            : res.status(403).json({ success: false, message: "Password incorrect" }) 
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
>>>>>>> 4c0fc6cf8fbf430bb1e5ed7214b91bd1f02d0dd6
    }
}

module.exports = {
    signUp,
    signIn
}