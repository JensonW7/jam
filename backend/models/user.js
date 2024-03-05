const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    friends: [friendSchema]
})

module.exports = mongoose.model('user', userSchema)