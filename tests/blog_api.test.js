const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const testBlogs = [
    {
        title: 'minun blogi',
        author: 'Samu',
        url: 'www.testUrl.frog',
        likes: 7
    },
    {
        title: 'blogger',
        author: 'Test Master',
        url: 'www.testUrl.frog',
        likes: 12
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of testBlogs) {
        let saved = new Blog(blog)
        await saved.save()
    }
})

const api = supertest(app)

test('right amount of blogs are returned in JSON format', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(testBlogs.length)

    await api.get('/api/blogs').expect('Content-Type', /application\/json/)
})

test('blogs id field is properly named', async () => {
    const res = await api.get('/api/blogs')
    const tested = res.body[0]
    expect(tested.id).toBeDefined()
})

test('blog can be added to the DB', async () => {
    const blog = new Blog({
        title: 'testing',
        author: 'tester',
        url: 'www.testURL.com',
        likes: 1
    })
    await api.post('/api/blogs').send(blog).expect(201)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(testBlogs.length + 1)
})

test('undefined likes is set to zero', async () => {
    const blog = new Blog({
        title: 'testing',
        author: 'tester',
        url: 'www.testURL.com'
    })
    let created = await api.post('/api/blogs').send(blog)
    expect(created.body.likes).toBe(0)
})

test('blog missng title or url will not be saved', async () => {
    const blog1 = new Blog({
        author: 'tester',
        url: 'www.testURL.com',
        likes: 1
    })
    const blog2 = new Blog({
        title: 'otsikko',
        author: 'tester',
        likes: 1
    })
    await api.post('/api/blogs').send(blog1).expect(400)
    await api.post('/api/blogs').send(blog2).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})