const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (!body.password) {
            response.status(400).send({ error: 'password can not be empty' })
        } else if (body.password.lenght < 3) {
            response.status(400).send({ error: 'password must be atleast 3 character long' })
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.json(savedUser)
        }
    } catch (exception) {
        response.status(400).send({error: 'something went wrong'})
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter