// setup
require('dotenv').config()
require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

//routes
const currentSongsCollectionRoutes = require('./routes/currentSongsCollection')
const spotifyAPIRoutes = require('./routes/spotifyAPI')
const userRoutes = require('./routes/userRoutes')

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/current_songs', currentSongsCollectionRoutes)

app.use('/spotify', spotifyAPIRoutes)

app.use('/users', userRoutes)

// connect to mongo database and listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })