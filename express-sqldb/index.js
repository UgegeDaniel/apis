const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

//CONSTANTS
const PORT = process.env.PORT || 5000;
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

app.get(base, (req, res)=>{
    res.status(200).json({success: true, message:"Base Route"})
})


app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: "unrecognized request" })
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server running on port 5000")
})