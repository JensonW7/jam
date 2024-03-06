// setup
import { useContext, useEffect, useState } from 'react'
import '../index.css'

// components
import SongCollection from '../components/SongCollection'
import useAuth from '../hooks/useAuth'

const Home = ({ code, state }) => {
    const [songCollections, setSongCollections] = useState(null)
    const res = useAuth(code, state)
    console.log(res)

    // const accessToken = useAuth(code, state)
    // console.log(res)

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