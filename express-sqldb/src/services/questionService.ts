import { QuestionModel } from "../models";
import { ApiError } from "../types/apiError";
import { CustomRequest } from "../types/requestType";
import { questionType } from "../types/types";

import questionsData from './data'
type itemType = {
    id: number;
    question: string,
    option: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
    },
    section: string;
    image: string;
    answer: string;
    solution: string;
    examtype: string;
    examyear: string;
}
const addQuestionService = async (req: CustomRequest) => {
    const { role } = req;
    if (role !== 'Student') throw new ApiError(401, 'You have no access');
    // const {
    //     examYear, question, instruction, optionA,
    //     optionB, optionC, optionD, optionE, subjectId, answer,
    // } = req.body;
    const { userId } = req;
    // const newQuestion: questionType = {
    //     examYear, question, instruction, optionA, optionB,
    //     optionC, optionD, optionE, subjectId, answer, contributor_id: userId
    // }
    // const roleId = '749c502f-fdc3-457b-ab70-48602e123370';
    const subjectId = '75ec97a7-0ef9-4709-ba9a-029fc273edff'

    const withId = questionsData.data.map((item: itemType) => {
        const newItem = {
            ...item, subjectId, contributor_id: userId, questions_uid: item.id, id: item.id + 55623
        }
        return newItem
    })
    return withId;
    // const data = await QuestionModel.addQuestion(newQuestion);
    // return data;
}

export default addQuestionService;