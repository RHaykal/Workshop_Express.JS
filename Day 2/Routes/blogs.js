const express = require('express')
const router = express.Router()
const blogsScheme = require('../models/blog')

//get all
router.get('/', async (req,res) => {
    try{
        const blogs = await blogsScheme.find()
        res.json(blogs)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//get one
router.get('/:id', (req,res) => {
    
})

//create one
router.post('/', async (req,res) => {
    const blog = new blogsScheme({
        author: req.body.author,
        content: req.body.content
    })
    try {
        const savedBlog = await blog.save()
        res.json(savedBlog)
    } catch (error) {
        res.json({message: "error"})
    }
})
//update one
router.patch('/:id', async (req,res) => {
    try {
        const updateBlog = await blogsScheme.updateOne({_id: req.params.id}, 
            {$set : {
                author: req.body.author,
                content: req.body.content
            }
        })
        res.json(updateBlog)
    } catch (error) {
        res.json({message: "error"})
    }
})
//delete one
router.delete('/:id', async (req,res) => {
    try{
        const deleteBlog = await blogsScheme.deleteOne({_id: req.params.id})
        res.json(deleteBlog)
    } catch (error) {
        res.json({message: "error"})
    }
})

module.exports = router