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

router.post('/access_token', async(req, res) => {
  console.log('access token called')

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
  console.log('sending access token')
  res.status(200).json(response.data)
  } catch(error) {
    res.status(400).json(error)
  }
})

// get access token and currently playing song
router.get('/callback', async (req, res) => {
  console.log('called callback on server')
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

    console.log(response)

    const accessToken = response.data.access_token;

    // Use the access token to access the Spotify Web API
    // const currentlyPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // });

    // Display the currently playing track as JSON
    // res.status(200).redirect('http://localhost:3000/').json(currentlyPlayingResponse.data);
    // res.status(200).json(currentlyPlayingResponse.data)
    console.log('sending access token')
    res.status(200).json(accessToken)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data from Spotify', details: error.message });
  }
});

module.exports = router