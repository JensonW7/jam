import { useEffect, useState } from 'react'

const SearchProfile = ({ searchResult }) => {
    return (
        <div className="results">
            {searchResult.map((result) => {
                return <button key={result._id}>{result.username}</button>
            })}
        </div>
    )
}

export default SearchProfile
