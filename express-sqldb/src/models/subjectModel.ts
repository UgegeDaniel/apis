import BaseModel from './baseModel';

class BaseSubjectModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  getAllSubjects = async () => {
    const allSubjects: {
      name: string;
    }[] = await this.getAll();
    const sortedSubjects = allSubjects.sort((subject, nextSubject) => {
      if (subject.name > nextSubject.name) {
        return 1;
      }
      return -1;
    });
    return sortedSubjects;
  };

  saveNewSubject = async (subject: string) => this.insert({ name: subject });
}

export default BaseSubjectModel;
