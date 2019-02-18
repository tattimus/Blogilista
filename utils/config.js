if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let PORT = process.env.PORT
let MONGODB_URL = process.env.MONGODB_URL
let SECRET = process.env.SECRET

module.exports = {
    PORT,
    MONGODB_URL,
    SECRET
}