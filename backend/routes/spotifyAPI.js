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

/*
router.post('/access_token', async(req, res) => {
  const code = req.body.code
  const state = req.body.state

  if (state === null) {
    return res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
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
  res.status(200).json(response.data)
  } catch(error) {
    res.status(400).json(error)
  }
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
    req.session.accessToken = accessToken;
    console.log(accessToken)

  // Redirect to a page or display a message indicating successful authentication
    } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve access token from Spotify', details: error.message });
  }
// fetching user profile data
  try {
    const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${req.session.accessToken}`
      }
    });
    req.session.userId = userProfileResponse.data.id;
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve user profile from Spotify', details: error.message });
  }
  res.send('Authentication successful! You can now access the Spotify data endpoints.');
});
*/

// UPDATING THE DATABASE
const currentSongCollection = require('../models/currentSongCollection');
router.post('/update-database', async (req, res) => {
  const { username, song } = req.body;
  console.log('Updating current song for user:', username);
  if (!song || !song.item) {
    return res.status(204).json({ message: 'No content currently playing' });
  }
  const currentSongData = song.item;
  const durationMs = song.item.duration_ms;
  const timestamp = song.timestamp;
  const duration = convertMsToMinutesAndSeconds(durationMs);

  // retrieving user song collection from database
  let userSongCollection = await currentSongCollection.findOne({ user: username });

  // or creating new one 
  if (!userSongCollection) {
    userSongCollection = new currentSongCollection({ user: username, songs: [] });
  }

  // if there are more than 5, update 
  if (userSongCollection.songs.length >= 5) {
    userSongCollection.songs.shift(); 
  }

  const songToAdd = {
    title: currentSongData.name,
    artist: currentSongData.artists.map(artist => artist.name).join(', '),
    album: currentSongData.album.name,
    image: {  
      url: currentSongData.album.images[0].url,
      height: currentSongData.album.images[0].height,
      width: currentSongData.album.images[0].width,
    },
    duration: duration,
    timestamp: timestamp
  }

  userSongCollection.songs.push(songToAdd);
  await userSongCollection.save();
  res.json(userSongCollection);

});

module.exports = router

// helper function for duration_ms
function convertMsToMinutesAndSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds; 
}