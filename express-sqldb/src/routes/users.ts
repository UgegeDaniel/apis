/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { Application } from 'express';
import {
  signUp, signIn, getStudentScore, saveStudentScore,
} from '../controllers/usersController';
import { signUpValidators, signInValidators } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';

// eslint-disable-next-line no-unused-vars
interface ApplicationGeneric<T> extends Application {}

const router = express.Router();

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new users
router.post('/signup', signUpValidators, signUp);

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in users
router.post('/signin', signInValidators, signIn);

// METHOD: get
// ACCESS: Student
// DESCRIPTION: Get student scores
router.get(
  '/score',
  authMiddleware as express.RequestHandler,
  getStudentScore as ApplicationGeneric<Record<string, any>>,
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
