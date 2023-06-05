import { ApiError } from "../types/apiErrorType";

export const checkStudentAccess = (role: string) => {
    if(role === 'Student' || role === 'Admin'){
        return true;
    }
    return new ApiError(400, 'Access denied')
}

export const checkTutorAccess = (role: string) => {
    if(role === 'Tutor' || role === 'Admin'){
        return true;
    }
    return new ApiError(400, 'Access denied')
}