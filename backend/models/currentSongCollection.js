const mongoose = require('mongoose')

const Schema = mongoose.Schema

const song = require('./song')

const currentSongCollectionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    songs: [song]
})

module.exports = mongoose.model('currentSongCollection', currentSongCollectionSchema)