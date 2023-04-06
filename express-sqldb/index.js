const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const questions = require('./routes/questions');
const students = require('./routes/students')

//CONSTANTS
const PORT = process.env.SERVER_PORT || 5000;
const app = express()

//GLOBAL MIDDLEWARES 
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//ERROR HANDLER
const errorHandler = () => {
    if (err) {
        res.status(500).json({ success: false, message: "Internal server error"})
        console.log(err)
    }
}

//ROUTES 
app.use('/api/questions', questions);
app.use('/api/students', students)

app.get('/', (req, res)=>{
    res.status(200).json({success: true, message:"Base Route"})
})

app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: "invalid request endpoint" })
})

app.use(errorHandler);
app.listen(PORT, () => {
    console.log("server running on port 5000")
})