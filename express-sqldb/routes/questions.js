const express = require('express');
const router = express.Router();
const pool = require('../connectDB');
//GET ALL SUBJECTS //USER ACCESS
router.get('/subjects', async (req, res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM subjects")
        res.json(allTodos.rows)
      }catch(err){
        console.error(err.message)
      }
})

//POST A SUBJECT //ADMIN ACCESS
module.exports = router;