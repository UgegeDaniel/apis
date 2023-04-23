/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import { signUp, signIn } from '../controllers/usersController';
import { signUpValidators, signInValidators } from '../middlewares/validation';

const router = express.Router();

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new users
router.post('/signup', signUpValidators, signUp);

// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in users
router.post('/signin', signInValidators, signIn);

export default router;
