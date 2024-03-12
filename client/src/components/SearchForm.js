import { useState } from 'react'
import '../styles/search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchForm = ({setSearchResult}) => {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        onsubmit(searchTerm)
    }

    const fetchUser = async(value) => {
        const response = await fetch('/users/' + value)
        const json = await response.json()

        if (response.ok) {
            setSearchResult(json)
        }
    }

    const handleChange = (value) => {
        setSearchTerm(value)
        fetchUser(value)
    }

    function renderSearchBox({searchTerm}) {
        return (
            <form name="form" onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input 
                    type="text" 
                    value={searchTerm}
                    placeholder='Search Profile'
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </form>
        )
    }

    return (
         <>
            {renderSearchBox({searchTerm})}
         </>
    )
}

export default SearchForm
