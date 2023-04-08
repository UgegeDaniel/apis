const pool = require('../connectDB');
const { signupQuery, signinQuery, roleQuery } = require('../utils/querries');
const { createToken } = require('../middlewares/auth')
const { errorResponse, hashPassword, validatePassword } = require('../utils');

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\"",

}

const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password);
    
    try {
        const { rows } = await pool.query(signupQuery, [name, email, hashedPassword]);
        const {rows: roleRows} = await pool.query(roleQuery, [rows[0].role_id]);
        const token = createToken({ studentId: rows[0].student_uid, role: roleRows[0].name })
        return res.status(201).json({ newStudent: rows[0], token, role: roleRows[0].name })
    } catch (error) {
        console.log(error)
        // if (error.message === errMsg.userExists) {
            // return errorResponse(res, 500, `User with email: "${email}" already exists`)
        }
        // return errorResponse(res, 500, error.message)
    // }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query(signinQuery, [email]);
        if (!rows[0]) {
            return errorResponse(res, 404, `User with email: "${email}" not found`)
        }
        const role = await pool.query(roleQuery, [rows[0].role_id]);
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