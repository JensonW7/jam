// setup
import { useEffect, useState } from 'react'
import '../index.css'

import SearchForm from '../Components/SearchForm'
import SearchProfileResult from '../Components/SearchProfileResult'

const SearchProfile = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const text = queryParameters.get("text")

    const [searchResult, setSearchResult] = useState(Array())

    useEffect(() => {
        const fetchProfiles = async() => {

            //we can switch the api to get the profiles
            //const response = await fetch('/api/profiles?'+text)

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

        fetchProfiles()
    }, [])


    return (
        <div className="profile">
            showing results: {text}
            <SearchProfileResult searchResult={searchResult} />
        </div>
    )
}

export default SearchProfile