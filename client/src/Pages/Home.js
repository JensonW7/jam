import { useContext, useEffect, useState } from 'react'
import '../index.css'
import SongCollection from '../Components/SongCollection'
import useAuth from '../hooks/useAuth'
//import useUpdateCurrentSong from '../hooks/useUpdateCurrentSong'
import { useUserContext } from '../hooks/useUserContext'

const Home = ({ code, state }) => {
    const {username, accessToken, dispatch} = useUserContext()
    const [songCollections, setSongCollections] = useState(null)
    useAuth(code, state)
    //useUpdateCurrentSong()

    useEffect(() => {
        const fetchCurrentSongCollections = async() => {
            const response = await fetch('/api/current_songs')
            const json = await response.json()

            if (response.ok) {
                setSongCollections(json)
            }
        }

        fetchCurrentSongCollections()
    }, [])

    return (
        <div className="home">
            <div className="songCollections">
                {songCollections && songCollections.map((collection) => (
                    <SongCollection key={collection._id} collection={collection}/>
                ))}
            </div>
        </div>
    )
}

export default Home
