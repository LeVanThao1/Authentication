require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(
    fileUpload({
        useTempFiles: true,
    }),
)
//connect database
require('./helper/init-mongoose')

app.use('/', (req, res, next) => {
    res.json({ message: 'Le Van Thao' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is runing port ', PORT))
