const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = require('./song');

//defines structure of doc
const currentSongCollectionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    songs: [songSchema]
})

module.exports = mongoose.model('currentSongCollection', currentSongCollectionSchema)