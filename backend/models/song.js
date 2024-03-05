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

// helper function for duration_ms
function convertMsToMinutesAndSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds; 
}