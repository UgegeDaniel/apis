/* eslint-disable linebreak-style */
import nodemailer from 'nodemailer';
import { emailVerificationText } from '../utils';

const { parsed } = require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ugege62@gmail.com',
    pass: parsed.NODE_MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailOptions = async (
  ref: string,
  userEmail: string,
  username?: string,
) => ({
  from: 'ugege62@gmail.com',
  to: userEmail,
  subject: 'Email Verification From Jakk',
  html: `${emailVerificationText(ref, username)}`,
});

export default transporter;
