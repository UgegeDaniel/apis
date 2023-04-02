const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const pool = require('./connectDB');

//CONSTANTS
const PORT = process.env.SERVER_PORT || 5000;
const reqEndpoints = {
    base: '/'
}

const {base} = reqEndpoints

const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


function errorHandler() {
    if (err) {
        res.status(500).json({ success: false, message: "Internal server error"})
        console.log(err)
    }
}

app.get(base, async (req, res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM subjects")
        res.json(allTodos.rows)
      }catch(err){
        console.error(err.message)
      }
    // res.status(200).json({success: true, message:"Base Route"})
})


app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: "unrecognized request" })
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server running on port 5000")
})