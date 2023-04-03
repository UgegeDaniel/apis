const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  addNewSubject,
  addNewQuestions
} = require('../controllers/questionsController')


//METHOD: get
//METHOD: user
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

module.exports = router;