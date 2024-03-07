import { useEffect, useState } from 'react'
import axios from 'axios'
// const session = require('express-session')

import { useUserContext } from '../hooks/useUserContext'

const Profile = () => {
    const {username, accessToken, dispatch} = useUserContext()

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // get the user's top artists and top tracks
        const fetchUserData = async () => {
            try {
                const [topArtistsResponse, topTracksResponse, topGenresResponse] = await Promise.all([
                    axios.get('https://api.spotify.com/v1/me/top/artists', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }),
                    axios.get('https://api.spotify.com/v1/me/top/tracks', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }),
                ]);

        const userData = {
            // totalMinutesPlayed: calculateTotalMinutes(topTracksResponse.data.items),
            // totalTracksPlayed: topTracksResponse.data.items.length,
            topArtists: topArtistsResponse.data.items,
            topTracks: topTracksResponse.data.items,
            // topGenres: extractTopGenres(topGenresResponse.data.items),
        };

        // handle response data and set it to state
        setUserData(userData);
        setIsLoading(false);
    
        // error handling
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
        };

        fetchUserData();
    }, []);

    // loading handling
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // error handling
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    {/* display of user data here on frontend */}
    return (
        <div>
            {/* <h2>Total Minutes Played: {userData.total_minutes_played}</h2>
            <h2>Total Tracks Played: {userData.total_tracks_played}</h2> */}
            <h2>This Month's Top Tracks :</h2>
            <ul>
                {userData.topTracks.map(track => (
                    <li key={track.id}>{track.name}</li>
                ))}
            </ul>
            <h2>This Month's Top Artists :</h2>
            <ul>
                {userData.topArtists.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
            {/* <h2>Top Genres:</h2>
            <ul>
                {userData.top_genres.map(genre => (
                    <li key={genre}>{genre}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default Profile
