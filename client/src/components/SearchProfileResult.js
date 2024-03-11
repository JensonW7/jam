import { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import SingleProfile from './SingleSearchResult'

const SearchProfile = ({ searchResult }) => {
    const {username, accessToken, dispatch} = useUserContext()

    const [friends, setFriends] = useState()
    useEffect(() => {
        const getFriends = async () => {
            const response = await fetch('/users/' + username)
            const json = await response.json()

            if (response.ok) {
                let temp_friends = []
                for (let i = 0; i < json[0].friends.length; i++) {
                    temp_friends.push(json[0].friends[i].username)
                }
                temp_friends.push(username)
                setFriends(temp_friends)
            }
        }

        getFriends()
    }, [searchResult, friends])

    return (
        <div className="results">
            {searchResult.map((profile) => {
                return (
                    <SingleProfile profile={profile} friends={friends} setFriends={setFriends}/>
                )
            })}
        </div>
    )
}

export default SearchProfile