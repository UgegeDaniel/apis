import express, { Application } from 'express';
const router = express.Router();
import { getAllSubjects, addNewSubject, getAvailableYears } from '../controllers/subjectsController'
interface ApplicationGeneric<T> extends Application { }

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all questions
router.get('/', getAllSubjects);

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all available years for subjects
router.get('/availableyears', getAvailableYears);

// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new subjects
router.post(
    '/new',
    addNewSubject as ApplicationGeneric<Record<string, any>>,
);

export default router;