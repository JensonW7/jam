import { useEffect } from 'react';
import { useUserContext } from './useUserContext';

export const useUpdateCurrentSong = () => {
    const { username, accessToken } = useUserContext();

    useEffect(() => {
        const fetchAndUpdateCurrentSong = async () => {
            if (!accessToken || !username) return;

            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch currently playing song.');

                const songData = await response.json();

                const updateResponse = await fetch('/spotify/update-database', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        song: songData,
                    }),
                });

                if (!updateResponse.ok) throw new Error('Failed to update current song in the database.');
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAndUpdateCurrentSong();
    }, [accessToken, username]);
};