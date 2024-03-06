// setup
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

// components
import SearchForm from '../Components/SearchForm'
import SearchProfileResult from '../Components/SearchProfileResult'

const SearchProfile = () => {
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchUser = async(value) => {
            const response = await fetch('/users/' + value)
            const json = await response.json()

            if (response.ok) {
                setSearchResult(json)
            }
        }
        
        fetchUser('')
    }, [])

    

    return (
        <div>
            <SearchForm setSearchResult={setSearchResult}/>
            <SearchProfileResult searchResult={searchResult} />
        </div>
    )
}

export default SearchProfile