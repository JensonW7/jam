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
        url: { type: String },
        height: { type: Number },
        width: { type: Number }
    },
    duration: {
        type: String, 
        required: true
    },
    timestamp: {
        type: Number
    }

});

module.exports = songSchema;