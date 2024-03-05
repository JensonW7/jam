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
        url: { type: String, required: true },
        height: { type: Number, required: true },
        width: { type: Number, required: true }
    },
    duration: {
        type: String, 
        required: true
    }

});

module.exports = songSchema;