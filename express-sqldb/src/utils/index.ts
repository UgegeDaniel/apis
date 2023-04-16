import bcrypt from 'bcrypt';
import { Request } from 'express';

export const getQuestionsField = (req: Request) => {
  const {
    examYear,
    question,
    instruction,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    subjectId,
  } = req.body;
  const questionFields = [
    examYear,
    question,
    instruction,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    subjectId,
  ];
  return questionFields;
};

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error: any | unknown) {
    throw new Error(error.message);
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};
