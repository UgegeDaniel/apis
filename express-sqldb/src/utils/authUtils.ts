import bcrypt from 'bcrypt';
import transporter, { mailOptions } from '../services/verifyEmail';
import { ApiError } from '../types/apiErrorType';

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) throw new ApiError(400, 'Incorrect credentials');
  return match;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const sendEmailToUser = (ref: string) => async (email: string, name?: string) => {
  const userMailOptions = await mailOptions(ref, email, name);
  return transporter.sendMail(userMailOptions, (err: any) => {
    if (err) {
      throw new ApiError(500, 'Error Sendng Email');
    }
  });
};
