import BaseModel from './baseModel';

class BaseSubjectModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  getAllSubjects = async () => this.getAll();

  saveNewSubject = async (subject: string) => this.insert({ name: subject });
}

export default BaseSubjectModel;
