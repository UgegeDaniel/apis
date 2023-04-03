const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/studentsController');
const { requireAuth } = require('../middlewares/auth');

//METHOD: post
//ACCESS: public
//DESCRIPTION: add new subjects
router.post('/signup', signUp)

router.post('/', requireAuth, (req, res) => {
    res.send("hi there")
})

module.exports = router;