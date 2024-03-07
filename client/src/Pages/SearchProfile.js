// setup
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

// components
import SearchForm from '../components/SearchForm'
import SearchProfileResult from '../components/SearchProfileResult'

const SearchProfile = () => {
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchProfiles = async() => {
            const response = await fetch('/api/current_songs')
            const json = await response.json()

            if (response.ok) {
                //setSongCollections(json)

                //dummy profile
                const profileData = [
                    { name: "name 1" },
                    { name: "name 2" },
                    { name: "name 3" },
                    { name: "name 4" },
                    { name: "name 5" },
                    { name: "name 6" },
                    { name: "name 7" },
                    { name: "name 8" }
                ];
                setSearchResult(profileData)
            }
        }

        const fetchUser = async(value) => {
            const response = await fetch('/users/' + value)
            const json = await response.json()

            if (response.ok) {
                setSearchResult(json)
            }
            }

        
        fetchUser('')
        fetchProfiles()
    }, [])

    

    return (
        <div>
            <SearchForm setSearchResult={setSearchResult}/>
            <SearchProfileResult searchResult={searchResult} />
        </div>
    )
}

export default SearchProfile