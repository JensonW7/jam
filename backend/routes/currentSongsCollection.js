// express
const express = require('express')
const router = express.Router()

// controller functions
const {
    createCurrentSongCollection,
    getCurrentSongCollection,
    getCurrentSongCollections,
    deleteCurrentSongCollection,
    updateCurrentSongCollection
} = require('../controllers/currentSongCollectionController')

// GET all current songs
router.get('/', getCurrentSongCollections)

// GET single current song
router.get('/:userId', getCurrentSongCollection)

// POST a new current song
router.post('/', createCurrentSongCollection)

// DELETE a current song
router.delete('/:userId', deleteCurrentSongCollection)

// UPDATE a current song
router.patch('/:userId', updateCurrentSongCollection)

module.exports = router