const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema ({
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
    image: {
        url: String,
        height: Number,
        width: Number,
        required: true
    },
    duration: {
        type: String, 
        required: true
    }

});

module.exports = mongoose.model('song', songSchema)