/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import {
  getAllSubjects,
  addNewSubject,
} from '../controllers/subjectsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();
interface ApplicationGeneric<T> extends Application {}

router.use(authMiddleware as express.RequestHandler);

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all questions
router.get('/', getAllSubjects);

// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new subjects
router.post('/new', addNewSubject as ApplicationGeneric<Record<string, any>>);

export default router;
