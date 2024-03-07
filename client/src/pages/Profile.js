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
                    axios.get('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }),
                    axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
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
            <ol>
                {userData.topTracks.slice(0,10).map(track => (
                    <li key={track.id}>
                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <img src={track.album.images[0].url} alt={track.name} style={{ width: '100px', height: '100px' }} />
                            <h3>{track.name} </h3>
                        </a>
                        <div>
                        </div>
        
                        </li>
                ))}
            </ol>
            <h2>This Month's Top Artists :</h2>
            <ol>
                {userData.topArtists.slice(0,10).map(artist => (
                    <li key={artist.id}>
                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        <img src={artist.images[0].url} alt={artist.name} style={{ width: '100px', height: '100px' }} />
                            <h3>{artist.name}</h3>
                        </a>
                    </li>
                ))}
            </ol>
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
