const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (req, res) => {
    if (!req.body.likes) {
        req.body.likes = 0
    }

    if (!req.body.url || !req.body.title) {
        res.status(400).send({ error: 'Bad request' })
    } else {
        const token = getTokenFrom(req)
        const decodedToken = jwt.verify(token, config.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes,
            user: user._id
        })
        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved._id)
        await user.save()
        res.status(201).json(saved.toJSON())
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter