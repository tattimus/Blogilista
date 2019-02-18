const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const red = (sum, item) => {
        return sum + item
    }

    let lista = blogs.map(b => b.likes)

    return lista.length === 0
        ? 0
        : lista.reduce(red, 0)
}

const favoriteBlog = (blogs) => {
    let lista = blogs.map(b => b.likes)
    let maxInd = lista.indexOf(Math.max(...lista))
    let palautus = blogs[maxInd]
    return palautus
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 'no blogs'
    }
    let sumOfOcc = 1
    let mostCommonOcc = 0
    namelist = blogs.map(b => b.author)
    namelist.sort()
    let currentName = ''
    let mostCommonName = ''
    namelist.forEach(name => {
        if (name !== currentName) {
            if (sumOfOcc > mostCommonOcc) {
                mostCommonName = currentName
                mostCommonOcc = sumOfOcc
            }
            currentName = name
            sumOfOcc = 1
        } else {
            ++sumOfOcc
        }
    })
    return {
        author: mostCommonName,
        blogs: mostCommonOcc
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}