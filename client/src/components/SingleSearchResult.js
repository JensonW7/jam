import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'

const SingleProfile = ({profile, friends, setFriends}) => {
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
        <div className="profile">
            <button key={profile._id} onClick={() => {handleClick(profile.username)}}>{profile.username}
                {friends && friends.includes(profile.username) && <span>following</span>}
            </button>
        </div>
    )
}

export default SingleProfile