const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const app = express();

app.post('login', (req, res) => {
    const code = req.body.code;
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: "bf775d6fe4f842a585020cac5810b7e6",
        clientSecret: "791de27964d94c5d8d00bb2f979368d8"
    })

    spotifyAPI.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})