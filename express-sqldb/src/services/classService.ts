import { ClassModel, UserModel } from '../models';
import { DbUserType } from '../types/tableTyes';

export const joinClassService = async (studentId: string, tutorId: string) => {
  const classToJoin = await ClassModel.addStudent(studentId, tutorId);
  return classToJoin;
};

export const getAllStudentsService = async (tutorId: string) => {
  const allTutorsStudents: DbUserType[] = await ClassModel.getAllStudentsForTutor(tutorId);
  const formattedStudents = allTutorsStudents.map((student: DbUserType) => ({
    studentEmail: student.email,
    studentName: student.name,
    studentId: student.users_uid
  }))
  return formattedStudents;
};

export const getAllTutorsForStudent = async (studentId: string) => {
  const allStudentTutors = await ClassModel.getAllTutorsForStudent(studentId);
  return allStudentTutors;
};

export const getAllTutors = async () => {
  const allAvailableTutors = await UserModel.getAllTutors();
  const formattedTutors = allAvailableTutors.map((tutor: DbUserType) => ({
    tutorEmail: tutor.email,
    tutorName: tutor.name,
    tutorId: tutor.users_uid
  }))
  return formattedTutors;
};
