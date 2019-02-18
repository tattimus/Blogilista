const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    const listWithOne = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Testing is nice :)',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 3,
            __v: 0
        }
    ]

    const emptyList = []

    const listWithMany = [
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Testing is Cool!',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Testing is nice :)',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 3,
            __v: 0
        }
    ]

    test('are equal to the likes of the only blog', () => {
        const likes = listHelper.totalLikes(listWithOne)
        expect(likes).toBe(3)
    })

    test('is zero when empty list is given', () => {
        const likes = listHelper.totalLikes(emptyList)
        expect(likes).toBe(0)
    })

    test('is equal to the combined likes of all blogs', () => {
        const likes = listHelper.totalLikes(listWithMany)
        expect(likes).toBe(10)
    })
})

describe('Most liked blog', () => {
    const lista = [
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'wrong',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'right',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'wrong',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 0,
            __v: 0
        }
    ]

    test('is the one with most likes', () => {
        const mlb = listHelper.favoriteBlog(lista)
        expect(mlb.title).toEqual('right')
    })
})

describe('Author with most blogs', () => {
    const lista = [
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'minun blogi',
            author: 'Samu',
            url: 'www.testUrl.frog',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'blogger',
            author: 'Test Master',
            url: 'www.testUrl.frog',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'life as a blog',
            author: 'Samu',
            url: 'www.testUrl.frog',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'blög',
            author: 'Seppo',
            url: 'www.testUrl.frog',
            likes: 0,
            __v: 0
        }
    ]
    
    test('is the on with most posts', () => {
        const mostBlogs = listHelper.mostBlogs(lista)
        expect(mostBlogs.author).toBe('Samu')
        expect(mostBlogs.blogs).toBe(2)
    })
})