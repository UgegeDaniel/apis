import { QuestionModel } from "../models";
import { ApiError } from "../types/apiError";
import { CustomRequest } from "../types/requestType";
import { questionType } from "../types/tableTyes";

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
    const {
        examYear, question, section, optiona, image,
        optionb, optionc, optiond, optione, subjectId, answer, examType
    } = req.body;
    const { userId } = req;
    const newQuestion: questionType = {
        examYear, question, section, optiona, optionb, image,
        optionc, optiond, optione, subjectId, answer, contributor_id: userId, examType
    }
    const data = await QuestionModel.addQuestion(newQuestion);
    return data;
}
