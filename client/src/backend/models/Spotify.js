const mongoose = require('mongoose')
const Schema = mongoose.Schema
const spotifySchema = new Schema({
    username: {
        type: String
    }
})