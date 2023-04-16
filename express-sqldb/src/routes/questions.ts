import express, { Application } from 'express';
import {
  getAllSubjects,
  addNewSubject,
  addNewQuestions,
  getQuestions
} from '../controllers/questionsController'
const router = express.Router();
import { authMiddleware } from '../middlewares/auth'

router.use(authMiddleware as express.RequestHandler)

interface ApplicationGeneric<T> extends Application {

}

//ACCESS: authenticated user
//DESCRIPTION: get all questions
router.get('/subjects', getAllSubjects)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new subjects
router.post('/subjects/new', addNewSubject as ApplicationGeneric<Record<string, any>>)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new questions
router.post('/new', addNewQuestions as ApplicationGeneric<Record<string, any>>)

//METHOD: get
//ACCESS: authenticated user
//DESCRIPTION: get questions for a particular year and subject
router.get('/', getQuestions)

export default router;