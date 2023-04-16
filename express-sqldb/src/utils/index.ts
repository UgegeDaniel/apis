import bcrypt from 'bcrypt';
import {Request} from 'express'

export const getQuestionsField = (req: Request) => {
    const { exam_year, question, instruction, option_a, 
        option_b, option_c, option_d, option_e, subject_id } = req.body;
    const questionFields = [exam_year, question, 
        instruction, option_a, option_b, option_c, option_d, option_e, subject_id]
        return questionFields
}

type Error = {
    message: string
}
export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (error: Error | unknown) {
        console.error(error)
    }
}

export const validatePassword = async (password: string, hashedPassword: string) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match;
}