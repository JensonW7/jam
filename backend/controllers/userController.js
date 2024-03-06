// setup
const mongoose = require('mongoose')

// models
const userCollection = require('../models/user')

// get all users
const getUsers = async (req, res) => {
    const users = await userCollection.find({})
    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params
    const user = await userCollection.find({'username': id})

    if (user.length == 0) {
        return res.status(404).json({error: "user doesn't exist"})
    }

    res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    const { username, friends } = req.body

    try {
        const user = await userCollection.create({ username, friends })
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "user doesn't exist"})
    }
    
    const user = await userCollection.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: "user doesn't exist"})
    }

    res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "user doesn't exist"})
    }
    
    const user = await user.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: "user doesn't exist"})
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}