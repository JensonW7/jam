// express
const express = require('express')
const router = express.Router()

// controller functions
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addFollowing
} = require('../controllers/userController')

// GET all users
router.get('/', getUsers)

// GET single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/update/:id', updateUser)

// add following to user
router.patch('/:id', addFollowing)

module.exports = router