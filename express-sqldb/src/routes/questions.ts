import express from 'express';
import { addNewQuestions, getQuestions, getAvailableYears} from '../controllers/questionsController';
import { authMiddleware } from '../middlewares/auth';
import { ApplicationGeneric } from '../types/requestType';

const router = express.Router();

router.use(authMiddleware as express.RequestHandler);

// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new questions
router.post('/new', addNewQuestions as ApplicationGeneric<Record<string, any>>);

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all available years for subjects
router.get('/availableyears', getAvailableYears);

// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get questions for a particular year and subject
router.get('/', getQuestions);

export default router;
