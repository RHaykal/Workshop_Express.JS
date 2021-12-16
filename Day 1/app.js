const express = require('express')
const app = express()
const port = 3000

let blogs = [
    {
        id: 1,
        author: "Haykal",
        creationDate: Date.now(),
        content: "This is my first ever blog!"     
    },
    {
        id: 2,
        author: "Alan Turing",
        creationDate: Date.now(),
        content: "I decypher enigma machine"
    }
]

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send("Hello, World!")
})

app.route('/blogs')
    .get(function (req,res) {
        res.json(blogs)
    })
    .post(function (req,res) {
        blogs.push(req.body)
        console.log(req.body)
        res.json(blogs)
    })
    
app.patch('/blogs/:id', (req,res) => {
    blogs.filter(blog => {
        if(blog.id == req.params.id) {
            blog.id = req.body.id
            blog.author = req.body.author
            blog.creationDate = Date.now()
            blog.content = req.body.content

            return blog
        }
    })

    res.json(blogs)
})

app.delete('/blogs/:id', (req,res) => {
    blogs = blogs.filter(blog => blog.id != req.params.id)
    res.json(blogs)
})


app.listen(port, () => {
    console.log('Server is listening on port '+ port)
})