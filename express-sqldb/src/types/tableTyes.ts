export type DbUserType  = {
    email: string,
    name?: string,
    password: string,
    users_uid: string,
  };
  
  export type questionType = {
    examYear: number;
    question: string;
    instruction: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    answer: string;
    subjectId: string;
    contributor_id: string;
    examType: string;
  }
  
  export type scoreType = {
    time_of_test: string;
    user_id: string;
    subject_id: string;
    score: number;
  };