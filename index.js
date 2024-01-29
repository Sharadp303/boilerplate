const express= require('express')
const mongoose=require("mongoose")
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieParser())

require('./routes/auth.routes')(app)
require('./routes/product.routes')(app)

mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to db")
    }).catch((err)=>{
        console.log(err)
    })

app.listen(process.env.PORT,()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})