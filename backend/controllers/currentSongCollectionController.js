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

  // get the song collection for specific user
  const userCurrentSongs = await currentSongCollection.findOne({user: username})

  // the current song is the last element of the array, so get the likes component of that
  let likeCount = userCurrentSongs.songs[userCurrentSongs.songs.length - 1].likes
  // increment counter
  likeCount += 1
}

module.exports = {
  getCurrentSongCollections,
  getCurrentSongCollection,
  createCurrentSongCollection,
  deleteCurrentSongCollection,
  updateCurrentSongCollection,
  updateLikes,
};

