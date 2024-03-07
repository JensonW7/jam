import { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'

const SearchProfile = ({ searchResult }) => {
    const {username, accessToken, dispatch} = useUserContext()
    const handleClick = async (userToFollow) => {
        const response = await fetch('/users/' + username, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userToFollow
            })
        })
    }

    return (
        <div className="results">
            {searchResult.map((result) => {
                return <button key={result._id} onClick={() => {handleClick(result.username)}}>{result.username}</button>
            })}
        </div>
    )
}

export default SearchProfile
