/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import {
  signUp,
  verifyEmail,
  signIn,
  getStudentHistory,
  saveStudentScore,
  resendEmail,
} from '../controllers/usersController';
import { signUpValidators, signInValidators } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';

interface ApplicationGeneric<T> extends Application {}

const router = express.Router();

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new student
router.post('/signup/student', signUpValidators, signUp('Student'));

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new tutors
router.post('/signup/tutor', signUpValidators, signUp('Tutor'));

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in student
router.post('/signin/student', signInValidators, signIn('Student'));

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in tutor
router.post('/signin/tutor', signInValidators, signIn('Tutor'));

// METHOD: get
// ACCESS: Authenticated User
// DESCRIPTION: Get student history
router.get(
  '/history',
  authMiddleware as express.RequestHandler,
  getStudentHistory('Student') as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: Student
// DESCRIPTION: Save Student scores
router.post(
  '/score/save',
  authMiddleware as express.RequestHandler,
  saveStudentScore('Student') as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/student/verifyEmail',
  authMiddleware as express.RequestHandler,
  verifyEmail('Student') as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/tutor/verifyEmail',
  authMiddleware as express.RequestHandler,
  verifyEmail('Tutor') as ApplicationGeneric<Record<string, any>>,
);

// METHOD: get
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.get(
  '/signup/resendEmail',
  authMiddleware as express.RequestHandler,
  resendEmail('Student') as ApplicationGeneric<Record<string, any>>,
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
