import { useState } from 'react'

const SearchForm = ({onsubmit}) => {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        onsubmit(searchTerm)
    }

    function renderSearchBox({searchTerm}) {
        return (
            <form name="form" onSubmit={handleSubmit}>
            <label> Search Profile:
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </label>
            <input type="submit" />
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
