const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/studentsController');
const { requireAuth } = require('../middlewares/auth');

//METHOD: post
//ACCESS: public
//DESCRIPTION: sign up new students
router.post('/signup', signUp)

//METHOD: post
//ACCESS: public
//DESCRIPTION: sign in students
router.post('/signin', signIn)

router.post('/', requireAuth, (req, res) => {
    res.send("hi there")
})

module.exports = router;