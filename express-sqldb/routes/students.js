const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/studentsController');
const {signUpValidators, signInValidators} = require('../middlewares/validation')

//METHOD: post
//ACCESS: public
//DESCRIPTION: sign up new students
router.post('/signup', signUpValidators, signUp)

//METHOD: post
//ACCESS: public
//DESCRIPTION: sign in students
router.post('/signin', signInValidators, signIn)

module.exports = router;