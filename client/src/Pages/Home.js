// setup
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'

// components
import SongCollection from '../Components/SongCollection'
import SearchForm from '../Components/SearchForm'
import useAuth from '../hooks/useAuth'

//context
import { useUserContext } from '../hooks/useUserContext'

const Home = ({ code, state }) => {
    const navigate = useNavigate()
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


    function getProfiles(searchTerm) {
        navigate("/SearchProfile?text="+searchTerm)
    }

    return (
        <div className="home">
            
            <SearchForm onsubmit={getProfiles} />
            
            <div className="songCollections">
                {songCollections && songCollections.map((collection) => (
                    <SongCollection key={collection._id} collection={collection}/>
                ))}
            </div>
        </div>
    )

}

export default Home