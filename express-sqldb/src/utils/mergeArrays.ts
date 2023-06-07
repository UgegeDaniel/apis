import { questionType } from "../types/tableTyes";

export default (arr1: questionType[], arr2: questionType[]) => {
    const mergedArray = [];
    const maxLength = Math.max(arr1.length, arr2.length);
    for(let i = 0; i < maxLength; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];
        const mergedObject = {
            ...obj1,
            ...obj2,
            userAnswer: obj1.userAnswer || obj2.userAnswer,
            answer: obj1.answer || obj2.answer
        }
        mergedArray.push(mergedObject);
    }
    return mergedArray;
}