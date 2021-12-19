const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}, () => {
    console.log('connected!')
})

const blogRoute = require('./Routes/blogs')
app.use('/blogs', blogRoute)

app.use(middleware)

app.get('/', (req, res) => {
    console.log("home")
    res.send("Hello, World!")
})

function middleware(req, res, next) {
    console.log('this is an example of middleware')
    next()
}

app.listen(3000, () => {
    console.log('Listening on port 3000')
})