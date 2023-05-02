import BaseModel from "./baseModel";

class BaseSubjectModel extends BaseModel {
    constructor(tableName: string) {
        super(tableName);
        this.tableName = tableName;
    }

    getAllSubjects = async () => {
        return  await this.getAll(); 
    };

    save = async (subject: string) => {
        return await this.insert({name: subject});
    };
}

export default BaseSubjectModel;