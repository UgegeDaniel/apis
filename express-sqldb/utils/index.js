const bcrypt = require('bcrypt');

const getQuestionsField = (req) => {
    const { exam_year, question, instruction, option_a, 
        option_b, option_c, option_d, option_e, subject_id } = req.body;
    const questionFields = [exam_year, question, 
        instruction, option_a, option_b, option_c, option_d, option_e, subject_id]
        return questionFields
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

module.exports ={
    getQuestionsField,
    errorResponse,
    hashPassword,
    validatePassword
}