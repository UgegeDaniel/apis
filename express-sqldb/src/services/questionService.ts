import { QuestionModel } from "../models";
import { ApiError } from "../types/apiError";
import { CustomRequest } from "../types/requestType";
import { questionType } from "../types/tableTyes";
// import { questionType } from "../types/types";

export const getAvailableYearsService = async (subjectId: string) => {
    if (!subjectId) throw new ApiError(400, 'SubjectId required');
    const data = await QuestionModel.getYears(subjectId);
    const years = Array.from(new Set(data.map((item: { examyear: number }) => item.examyear)));
    return years
}

export const getQuestionsService = async (subjectId: string, examyear: number) => {
    if (!subjectId || !examyear) throw new ApiError(400, 'SubjectId and exam year required');
    const data: questionType[] = await QuestionModel.getQuestions(subjectId, examyear);
    const questions = [...new Map(data.map((item: questionType) => [item.question, item])).values()]
    return questions
}

export const addQuestionService = async (req: CustomRequest) => {
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

    // const withId = questionsData.data.map((item: itemType) => {
    //     const newItem = {
    //         ...item, subjectId, contributor_id: userId, questions_uid: item.id, id: item.id + 55623
    //     }
    //     return newItem
    // })
    // return withId;
    // const data = await QuestionModel.addQuestion(newQuestion);
    // return data;
}
