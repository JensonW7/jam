// express
const express = require('express')
const router = express.Router()


// setup
const axios = require('axios')
const querystring = require('querystring')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI


// random string generator
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// login
router.get('/login', function (req, res) {
    const state = generateRandomString(16)
    const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private app-remote-control streaming user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify'
    
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))
})

// get access token and currently playing song
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    return res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  }

  const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      }
    });

    const accessToken = response.data.access_token;
    console.log(accessToken)

  // Redirect to a page or display a message indicating successful authentication
    res.send('Authentication successful! You can now access the Spotify data endpoints.');
    } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve access token from Spotify', details: error.message });
  }
});

const currentSongCollection = require('../models/currentSongCollection');

router.get('/currently-playing', async (req, res) => {
  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized: No access token available' });
  }

  try {
    const currentlyPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      } 
    });

    if (!currentlyPlayingResponse.data || !currentlyPlayingResponse.data.item) {
      return res.status(204).json({ message: 'No content currently playing' });
    }

    const currentSongData = currentlyPlayingResponse.data.item;
    const durationMs = currentlyPlayingResponse.data.item.duration_ms;
    const duration = convertMsToMinutesAndSeconds(durationMs);
    const userId = req.user.__id; // idk if this is right

    // retrieving user song collection from database
    let userSongCollection = await currentSongCollection.findOne({ user: userId });
    
    // or creating new one 
    if (!userSongCollection) {
      userSongCollection = new currentSongCollection({ user: userId, songs: [] });
    }

    // if there are more than 5, update 
    if (userSongCollection.songs.length >= 5) {
      userSongCollection.songs.shift(); 
    }

    const songToAdd = {
      title: currentSongData.name,
      artist: currentSongData.artists.map(artist => artist.name).join(', '),
      album: currentSongData.album.name,
      image: {  // Make sure this matches the structure defined in your song schema
        url: currentSongData.album.images.url,
        height: currentSongData.album.images.height,
        width: currentSongData.album.images.width,
      },
      duration: duration
    }

    userSongCollection.songs.push(songToAdd);
    await userSongCollection.save();
    res.json(userSongCollection);

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve currently playing song from Spotify', details: error.message });
  }
});


module.exports = router

// helper function for duration_ms
function convertMsToMinutesAndSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds; 
}