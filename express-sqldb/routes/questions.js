const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  addNewSubject,
  addNewQuestions,
  getQuestions
} = require('../controllers/questionsController');
const {requireAuth} = require('../middlewares/auth')

router.use(requireAuth)


//METHOD: get
//METHOD: authenticated user
//DESCRIPTION: get all questions
router.get('/subjects', getAllSubjects)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new subjects
router.post('/subjects/new', addNewSubject)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new questions
router.post('/new', addNewQuestions)

//METHOD: get
//ACCESS: authenticated user
//DESCRIPTION: get questions for a particular year and subject
router.get('/', getQuestions)

module.exports = router;