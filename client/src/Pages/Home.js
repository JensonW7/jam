// setup
import { useContext, useEffect, useState } from 'react'
import '../index.css'

// components
import SongCollection from '../components/SongCollection'
import useAuth from '../hooks/useAuth'

//context
import { useUserContext } from '../hooks/useUserContext'

const Home = ({ code, state }) => {
    const {username, accessToken, dispatch} = useUserContext()
    
    const [songCollections, setSongCollections] = useState(null)
    useAuth(code, state)

    console.log('username from home:', username)
    console.log('access token from home:', accessToken)

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