/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import express, { Application } from 'express';
import {
  getAllSubjects,
  addNewSubject,
  addNewQuestions,
  getQuestions,
} from '../controllers/questionsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware as express.RequestHandler);

interface ApplicationGeneric<T> extends Application {}

// ACCESS: authenticated user
// DESCRIPTION: get all questions
router.get('/subjects', getAllSubjects);

// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new subjects
router.post(
  '/subjects/new',
  addNewSubject as ApplicationGeneric<Record<string, any>>,
);

// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new questions
router.post('/new', addNewQuestions as ApplicationGeneric<Record<string, any>>);

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get questions for a particular year and subject
router.get('/', getQuestions);

export default router;
