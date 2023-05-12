import { ScoresModel } from "../models";

export default async (userId: string) => {
    console.log(userId)
    const constraint = {
        primaryColumn: 'user_id',
        primaryValue: userId,
        secondaryColumn: 'subject_id',
        columOnSecondaryTable: 'subjects_uid'
    }
    const history = await ScoresModel.getUserHistory(constraint)
    return history;
}
