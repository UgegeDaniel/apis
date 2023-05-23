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
// DESCRIPTION: sign up new users
router.post('/signup', signUpValidators, signUp);

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/verifyEmail',
  authMiddleware as express.RequestHandler,
  verifyEmail as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: Authenticated User
// DESCRIPTION: Verify user email
router.post(
  '/signup/resendEmail',
  authMiddleware as express.RequestHandler,
  resendEmail as ApplicationGeneric<Record<string, any>>,
);

//DELETE FROM "public"."users" WHERE email='test2@gmail.com'
// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in users
router.post('/signin', signInValidators, signIn);

// METHOD: get
// ACCESS: Authenticated User
// DESCRIPTION: Get student history
router.get(
  '/history',
  authMiddleware as express.RequestHandler,
  getStudentHistory as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: Student
// DESCRIPTION: Save Student scores
router.post(
  '/score/save',
  authMiddleware as express.RequestHandler,
  saveStudentScore as ApplicationGeneric<Record<string, any>>,
);
export default router;
