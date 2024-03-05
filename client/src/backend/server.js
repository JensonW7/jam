require('dotenv').config()
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const mongoose = require('mongoose')

const app = express();

var client_id = '3b16e98323b945758c4eac59f1ebc51f';
var client_secret = '064b87ac020e458d9f1a446ab0fa2a34';
var redirect_uri = 'http://localhost:3000/callback';

// Generates a random string for the state parameter
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// send user to Spotify authentication with required query params
app.get('/login', function(req, res) {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private app-remote-control streaming user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// once user grants/denies permission, Spotify redirects them to this route with code and state params
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  // checking state
  if (state === null) {
    return res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  }
  // when state is verified, we make post request to get access token 
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

    // use the access token to access the Spotify Web API
    const currentlyPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      } 
    });

    const currentUsersProfile = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`    
        }
    });

    const getTopArtists = await await axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        } 
    });

    const getTopTracks = await await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        } 
    });
    const responseData = {
        currentlyPlaying: currentlyPlayingResponse.data,
        userProfile: currentUsersProfile.data,
        topArtists: getTopArtists.data,
        topTracks: getTopTracks.data
      };
    // Display the currently playing track as JSON
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data from Spotify', details: error.message });
  }
});

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server running on port", process.env.PORT);
          });
          
    })
    .catch((error) => {
        console.log(error)
    })

