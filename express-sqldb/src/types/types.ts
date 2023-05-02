export interface TokenPayload {
  userId: string;
  role: string;
}

export type User = {
  users_uid: string;
  email: string,
  name: string,
  password: string,
  role_id: string,
  roles_name: string
};

export type questionType = {
  examYear: number;
  question: string;
  instruction: string;
  number: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  answer: string;
  subjectId: string;
}

export type scoreType = {
  time_of_test: string;
  user_id: string;
  subject_id: string;
  score: number;
};
