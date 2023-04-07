const getQuestionsField = (req) => {
    const { exam_year, question, instruction, option_a, 
        option_b, option_c, option_d, option_e, subject_id } = req.body;
    const questionFields = [exam_year, question, 
        instruction, option_a, option_b, option_c, option_d, option_e, subject_id]
        return questionFields
}

module.exports ={
    getQuestionsField
}