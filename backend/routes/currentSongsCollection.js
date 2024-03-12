// express
const express = require('express')
const router = express.Router()

// controller functions
const {
    createCurrentSongCollection,
    getCurrentSongCollection,
    getCurrentSongCollections,
    deleteCurrentSongCollection,
    updateCurrentSongCollection,
    addLike,
    removeLike
} = require('../controllers/currentSongCollectionController')

// GET all current songs
router.get('/', getCurrentSongCollections)

// GET single current song
router.get('/:username', getCurrentSongCollection)

// POST a new current song
router.post('/', createCurrentSongCollection)

// DELETE a current song
router.delete('/:username', deleteCurrentSongCollection)

// UPDATE a current song
router.patch('/:username', updateCurrentSongCollection)

// PATCH to add like
router.patch('/add_like/:username', addLike);

// PATCH to remove like
router.patch('/remove_like/:username', removeLike)

module.exports = router