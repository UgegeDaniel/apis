const pool = require('../connectDB');
const bcrypt = require('bcrypt');
const { signupQuery, signinQuery } = require('../utils/querries');
const { createToken } = require('../middlewares/auth')

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\"",

}
const errorResponse = (res, code, msg) => {
    console.error(msg)
    return res.status(code).json({ success: false, msg })
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
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
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password)
    try {
        const { rows } = await pool.query(signupQuery, [name, email, hashedPassword]);
        const role = await pool.query("SELECT * FROM roles WHERE role_uid = $1", [rows[0].role_id]);
        const roleName = role.rows[0].name;
        const token = createToken({ studentId: rows[0].student_uid, role: roleName })
        return res.status(201).json({ newStudent: rows[0], token, role: roleName })
    } catch (error) {
        if (error.message === errMsg.userExists) {
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
            return errorResponse(res, 404, `User with email: "${email}" not found`)
        }
        const role = await pool.query("SELECT * FROM roles WHERE role_uid = $1", [rows[0].role_id]);
        const token = createToken({ studentId: rows[0].student_uid, role: role.rows[0].name })
        return validatePassword(password, rows[0].password)
            ? res.status(201).json({ newStudent: rows[0], token, role: role.rows[0].name })
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