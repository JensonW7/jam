import React from "react"
import { useState, useEffect } from "react"

const Statistics = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [totalMinutesPlayed, setTotalMinutesPlayed] = useState(0);
    const [topArtists, setTopArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
  
    return (
      <div>
        <h2>Weekly Statistics</h2>
        <h3>5 Recently Played Songs</h3>
        <ul>
          {recentlyPlayed.map(song => (
            <li key={song.id}>{song.name} by {song.artists.map(artist => artist.name).join(', ')}</li>
          ))}
        </ul>
        <h3>Total Minutes Played Last Week: {totalMinutesPlayed.toFixed(2)} minutes</h3>
        <h3>Top 3 Artists Last Week</h3>
        <ol>
          {topArtists.map(artist => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ol>
        <h3>Top 3 Songs Last Week</h3>
        <ol>
          {topSongs.map(song => (
            <li key={song.id}>{song.name} by {song.artists.map(artist => artist.name).join(', ')}</li>
          ))}
        </ol>
        <h3>Top 10 Genres Last Week</h3>
        <ol>
          {topGenres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ol>
      </div>
    );
  };
  
  export default Statistics;