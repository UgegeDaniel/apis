const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  addNewSubject,
  addNewQuestions,
  getQuestions
} = require('../controllers/questionsController');
const {requireAuth} = require('../middlewares/auth')


//METHOD: get
//METHOD: user
//DESCRIPTION: get all questions
router.get('/subjects', requireAuth, getAllSubjects)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new subjects
router.post('/subjects/new', addNewSubject)

//METHOD: post
//ACCESS: admin
//DESCRIPTION: add new questions
router.post('/new', addNewQuestions)

//METHOD: get
//ACCESS: authorised user
//DESCRIPTION: get questions for a particular year and subject
router.get('/', requireAuth, getQuestions)

module.exports = router;