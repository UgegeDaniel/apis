/* eslint-disable linebreak-style */
import nodemailer from 'nodemailer';
import { emailVerificationText } from '../utils';
import ReferenceManager from './emailVerificationRefernce';

// Example usage
export const referenceManager = new ReferenceManager();
const { parsed } = require('dotenv').config();
const refExpiration = parsed.REF_EXPIRATION!;

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

export const mailOptions = async (
  userId: string,
  userEmail: string,
  username?: string,
) => {
  const reference = referenceManager.createReference(userId, refExpiration);
  return {
    from: 'ugege62@gmail.com',
    to: userEmail,
    subject: 'Email Verification From Jakk',
    html: `${emailVerificationText(reference.getReference(), username)}`,
  };
};

export default transporter;
