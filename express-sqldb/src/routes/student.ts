import express, { Application } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  getStudentHistory,
  saveStudentScore,
} from '../controllers/studentController';
import { signInValidators, signUpValidators } from '../middlewares/validation';
import { resendEmail, signIn, signUp, verifyEmail } from '../controllers/usersController';

interface ApplicationGeneric<T> extends Application {}
const router = express.Router();

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new student
router.post('/signup', signUpValidators, signUp('Student'));

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in student
router.post('/signin', signInValidators, signIn('Student'));

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/verifyEmail',
  authMiddleware as express.RequestHandler,
  verifyEmail('Student') as ApplicationGeneric<Record<string, any>>,
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

export default router;