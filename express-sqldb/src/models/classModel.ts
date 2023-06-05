import { DbUserType } from '../types/tableTyes';
import BaseModel from './baseModel';

class BaseClassModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  addStudent = async (student_id: string, tutor_id: string) => {
    const newStudent = await this.insert({
      tutor_id,
      student_id,
    });
    return newStudent[0];
  };

  getAllStudentsForTutor = async (tutor_id: string) => {
    const allStudents: DbUserType[] = await this.innerJoin('users', {
      secondaryColumn: 'student_id',
      columOnSecondaryTable: 'users_uid',
      primaryColumn: 'tutor_id',
      primaryValue: tutor_id,
    });
    return allStudents;
  };

  getAllTutorsForStudent = async (student_id: string) => {
    const allStudents = await this.innerJoin('users', {
      secondaryColumn: 'tutor_id',
      columOnSecondaryTable: 'users_uid',
      primaryColumn: 'student_id',
      primaryValue: student_id,
    });
    return allStudents[0];
  };
}

export default BaseClassModel;
