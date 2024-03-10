// setup
const mongoose = require("mongoose");

// models
const currentSongCollection = require("../models/currentSongCollection");

// get all current songs
const getCurrentSongCollections = async (req, res) => {
  const current_songs = await currentSongCollection.find({});
  res.status(200).json(current_songs);
};

// get a single current song
const getCurrentSongCollection = async (req, res) => {
  const { username } = req.params;

  const current_song = await currentSongCollection.findOne({ user: username });

  if (!current_song) {
    return res.status(404).json({ error: "song doesn't exist" });
  }

  res.status(200).json(current_song);
};

// create a new current song
const createCurrentSongCollection = async (req, res) => {
  const { user, songs } = req.body;

  try {
    const current_song = await currentSongCollection.create({ user, songs });
    res.status(200).json(current_song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a current song
const deleteCurrentSongCollection = async (req, res) => {
  const { username } = req.params;

  const current_song = await currentSongCollection.findOneAndDelete({
    user: username,
  });
  if (!current_song) {
    return res.status(404).json({ error: "song doesn't exist" });
  }

  res.status(200).json(current_song);
};

// update a current song
const updateCurrentSongCollection = async (req, res) => {
  const { userId } = req.params;

  const current_song = await currentSongCollection.findOneAndUpdate(
    { user: userId },
    {
      ...req.body,
    }
  );

  if (!current_song) {
    return res.status(404).json({ error: "song doesn't exist" });
  }

  res.status(200).json(current_song);
};

// update likes
const updateLikes = async (req, res) => {
  const { username, songId } = req.body;

  try {
    // get the user's current songs collection
    const userCurrentSongs = await currentSongCollection.findOne({ user: username });

    // error handling
    if (!userCurrentSongs) {
      return res.status(404).json({ message: "User's current songs collection not found." });
    }

    // find the last song in the user's songs array and increment likes
    const lastSongIndex = userCurrentSongs.songs.length - 1;
    userCurrentSongs.songs[lastSongIndex].likes++;
    
    // update the database with the modified songs array
    const updatedUserSongs = await currentSongCollection.findOneAndUpdate(
      { user: username },
      { $set: { songs: userCurrentSongs.songs } },
    );

    res.status(200).json(updatedUserSongs);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getCurrentSongCollections,
  getCurrentSongCollection,
  createCurrentSongCollection,
  deleteCurrentSongCollection,
  updateCurrentSongCollection,
  updateLikes,
};