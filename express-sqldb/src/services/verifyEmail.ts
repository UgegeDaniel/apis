/* eslint-disable linebreak-style */
import nodemailer from 'nodemailer';
import { emailVerificationText } from '../utils';
import bcrypt from 'bcrypt';

const createReference = async (userId: string) => {
  const salt = await bcrypt.genSalt(10);
  const ref = await bcrypt.hash(userId, salt);
  return ref;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ugege62@gmail.com',
    pass: 'tlbmqqlouaugyctt',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailOptions = async (userId: string, userEmail: string, username?: string) => {
  const ref = await createReference(userId);
  return{
  from: 'ugege62@gmail.com',
  to: userEmail,
  subject: 'Email Verification From Jakk',
  html: `${emailVerificationText(ref, username)}`,
}};

export default transporter;
