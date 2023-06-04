export type DbUserType = {
  email: string;
  name?: string;
  password: string;
  users_uid: string;
  verified: boolean;
  payment_ref: string;
  role_name: string
};

export type questionType = {
  examYear: number;
  question: string;
  section: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  optione: string;
  answer: string;
  image: string;
  subjectId: string;
  contributor_id: string;
  examType: string;
};

export type apiQuestionType = {
  examyear: number;
  question: string;
  section: string;
  option: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  answer: string;
  image: string;
  examtype: string;
  solution: string;
};

export type scoreType = {
  time_of_test: string;
  user_id: string;
  subject_id: string;
  score: number;
};
