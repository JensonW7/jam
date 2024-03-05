const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const currentSongCollectionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    songs: [songSchema]
})

module.exports = mongoose.model('currentSongCollection', currentSongCollectionSchema)