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
        const fetchUsers = async() => {
            const response = await fetch('/users/')
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                setSearchResult(json)
            }
        }
        
        fetchUsers()
    }, [])


    return (
        <div>
            <SearchForm setSearchResult={setSearchResult}/>
            <SearchProfileResult searchResult={searchResult} />
        </div>
    )
}

export default SearchProfile