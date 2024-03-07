import { useState } from 'react'

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
                <label> Search Profile:
                <input 
                    type="text" 
                    value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    onChange={(e) => handleChange(e.target.value)}
                />
                </label>
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
