/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import {
  signUp,
  verifyEmail,
  signIn,
  resendEmail,
} from '../controllers/usersController';
import { signUpValidators, signInValidators } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';

interface ApplicationGeneric<T> extends Application {}

const router = express.Router();

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new tutors
router.post('/signup', signUpValidators, signUp('Tutor'));

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in tutor
router.post('/signin', signInValidators, signIn('Tutor'));

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/verifyEmail',
  authMiddleware as express.RequestHandler,
  verifyEmail('Tutor') as ApplicationGeneric<Record<string, any>>,
);

// METHOD: get
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.get(
  '/signup/resendEmail',
  authMiddleware as express.RequestHandler,
  resendEmail('Tutor') as ApplicationGeneric<Record<string, any>>,
);
export default router;
