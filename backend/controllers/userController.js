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
    const user = await userCollection.find({'username': {$regex: id}})

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
    const { username } = req.params;

    const user = await userCollection.findOneAndDelete({ username: username });

    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }

    res.status(200).json({ message: `User ${username} deleted successfully` });
}
// update a user
const updateUser = async (req, res) => {
    console.log('called')
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

// add following
const addFollowing = async (req, res) => {
    const { id } = req.params
    
    const user = await userCollection.findOne({username: id})

    following = (id == req.body.user)
    newFriends = user.friends

    for (let i = 0; i < newFriends.length; i++) {
        friend = JSON.parse(JSON.stringify(newFriends[i]))
        if (friend.username == req.body.user) {
            following = true
        }
    }

    if (!following) {
        newFriends.push({username: req.body.user})

        const updated = await userCollection.findOneAndUpdate({username: id}, {$set: {friends: newFriends}})

        if (!updated) {
            res.status(404).json({error: "couldn't follow user"})
        }
    }

    res.status(200).json(user)
}

const removeFollowing = async (req, res) => {
    console.log('called')
    const { id } = req.params
    const user = await userCollection.findOne({username: id})

    if (user && id != req.body.user) {
        let newFriends = []
        let tempFriends = user.friends
        for (let i = 0; i < tempFriends.length; i++) {
            if (tempFriends[i].username != req.body.user) {
                newFriends.push(tempFriends[i])
            }
        }

        console.log(newFriends)

        const updated = await userCollection.findOneAndUpdate({username: id}, {$set: {friends: newFriends}})

        if (!updated) {
            res.status(404).json({error: "couldn't unfollow user"})
        }
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addFollowing,
    removeFollowing
}