// imports
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '../hooks/useUserContext'
import "../styles/profile.css"
import "../index.css"
import "../styles/friendBox.css"

const Profile = () => {
    // react context to share accessToken to access Spotify data
    const {username, accessToken, dispatch} = useUserContext()

    // setting variables
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topGenres, setTopGenres] = useState([]);

    // get user's top artists and tracks using short term (4 weeks) data
    // GET request with axios 
    // use accesstoken from react context to get said data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [topArtistsResponse, topTracksResponse] = await Promise.all([
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
                ], [accessToken]);


        // direct data from Spotify 
        const userData = {
            topArtists: topArtistsResponse.data.items,
            topTracks: topTracksResponse.data.items,
        };

        // for calcualting top genre with both top artists and top tracks
        // 1) use artist as parameter for flatMap array and accesses their respective genres array
        // 2) use track as a parameter for flatMap array and accesses their respective genres array
        // filter Boolean rids of undefined (or null) values that are set (this error was found)
        const topArtistsGenres = topArtistsResponse.data.items.flatMap(artist => artist.genres).filter(Boolean);
        const topTracksGenres = topTracksResponse.data.items.flatMap(track => track.album.genres).filter(Boolean);
        
        // we want to calculate top genre via both methods, combine the 2 to a single array named genres
        const genres = [...topArtistsGenres, ...topTracksGenres];

        // store genre counts
        const genreCounts = {};
        // iterate through the genres 
        for (const genre of genres) {
            // if the genre is already in genreCounts, increment count by 1
            // if not, initialize count to 1
         if (genreCounts[genre]) {
                genreCounts[genre]++;
        } else {
            genreCounts[genre] = 1;
            }   
        }       

        // sort genres by frequency
        // Object.keys returns array of keys (which are the genre names)
        // sort((a, b)) => [b] - [a] sorts based on computing the difference between 2 genres
        // if the result is positive, a comes before b and if negative, b comes before a etc.
        const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

        // get top 5 genres
        const topFiveGenres = sortedGenres.slice(0, 10);
        // set top genres in state
        setTopGenres(topFiveGenres);
        setIsLoading(false);

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

    // for 30 second preview player of the top songs
    const PreviewPlayer = ({ previewUrl }) => {
        return (
            <div className="preview-audio-player">
                <audio controls>
                    <source src={previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    };

    {/* display of user data here on frontend */}
    return (
        <div>
            <h2>This Month's Top Tracks:</h2>
                <div className="track-container">
                            <ol>
                                {userData.topTracks.slice(0, 10).map(track => (
                                    <li key={track.id}>
                                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                            <div className="track-item">
                                                <div className="track-item-content">
                                                    <img src={track.album.images[0].url} alt={track.name} />
                                                    <div className="track-details">
                                                        <h3>{track.name}</h3>
                                                        <p>Artist: {track.artists.map(artist => artist.name).join(', ')}</p>
                                                        <p>Album: {track.album.name}</p>
                                                        <PreviewPlayer previewUrl={track.preview_url} />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                </div>


            <h2>This Month's Top Artists:</h2>
            <ol className="artist-container">
                {userData.topArtists.slice(0,10).map((artist, index) => (
                    <li key={artist.id} className="artist-item">
                        <div className="artist-item-content">
                            <div>
                                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <img src={artist.images[0].url} alt={artist.name} style={{ width: '100px', height: '100px' }} />
                                    <h3>{artist.name}</h3>
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>


            <h2>This Month's Top Genres:</h2>
            <div classname="genre">
                <ol>
                    {topGenres.map((genre, index) => (
                        <li key={genre}>
                            <span>{index + 1}. </span>
                            <span>{genre}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Profile
