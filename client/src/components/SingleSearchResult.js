import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

const SingleProfile = ({profile, friends, setFriends}) => {
    const {username, accessToken, dispatch} = useUserContext()
    const handleClick = (user) => {
        const unfollowUser = async (user) => {
            console.log('called unfollow user')
            const response = await fetch('/users/unfollow/' + username, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user
                })
            })
        }

        const followUser = async (user) => {
            console.log('called follow user')
            const response = await fetch('/users/' + username, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user
                })
            })
        } 

        if (friends && friends.includes(profile.username)) {
            unfollowUser(user)
        } else {
            followUser(user)
        }
    }

    return (
        <div className="profile">
            <button key={profile._id} onClick={() => {handleClick(profile.username)}}>{profile.username}
                {friends && friends.includes(profile.username) && <span>unfollow <FontAwesomeIcon icon={faCheck} /></span>}
                {friends && !friends.includes(profile.username) && <span>follow <FontAwesomeIcon icon={faPlus} /></span>}
            </button>
        </div>
    )
}

export default SingleProfile