const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const pool = require('../connectDB');
const {addStudentQuery} = require('../controllers/querries')

const errMsg = {
    userExists: "duplicate key value violates unique constraint \"students_email_key\""
}

const createToken = (id) => {
    return jwt.sign(
        id, secret, { expiresIn: '1d' }
    )
}

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ msg: "Token required" })
    const token = authorization.split(' ')[1];
    try {
        const { studentId } = jwt.verify(token, secret)
        req.studentId = studentId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Invalid token" })
    }
}

//METHOD: post
//ACCESS: public
//DESCRIPTION: add new subjects
router.post('/signup', async (req, res) => {
    const { email, password, name, admin } = req.body;
    try {
        const { rows } = await pool.query(addStudentQuery, [name, email, password, admin]);
        const studentId = rows[0].student_uid;
        const token = createToken({ studentId })
        return res.status(201).json({ newStudent: rows[0], token })
    } catch (error) {
        if(error.message = errMsg.userExists){
            return res.status(500).json({ success: false, message: "User with that email already exists"})
        }
        console.error(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/', requireAuth, (req, res) => {
    res.send("hi there")
})


// {
//     "email": "johndoe@gmail.com",
//     "password": "123"
// }

module.exports = router;