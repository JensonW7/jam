// setup
import { useContext, useEffect, useState } from "react";
import "../index.css";

// components
import FriendBox from "../components/HomeSquares/FriendBox";

import SearchForm from '../components/SearchForm'
import useAuth from '../hooks/useAuth'


//context
import { useUserContext } from "../hooks/useUserContext";

const Home = ({ code, state }) => {
  const { username, accessToken, dispatch } = useUserContext();
  const [friendBoxes, setFriendBoxes] = useState(null);
  const [friendsArray, setFriendsArray] = useState([])

  useAuth(code, state);

  useEffect(() => {
    const fetchUserFriends = async () => {
      const response = await fetch('/users/' + username)
      const json = await response.json()

      if (response.ok) {
        setFriendsArray(json[0].friends)
      }
    }

    fetchUserFriends()

  }, [username])

  useEffect(() => {
    let friendsCollectionArray = []
    for (let i = 0; i < friendsArray.length; i++) {
      const fetchFriendCollection = async () => {
        const response = await fetch('/api/current_songs/' + friendsArray[i].username)
        const json = await response.json()

        if (response.ok) {
          friendsCollectionArray.push(json)
        }
      }

      fetchFriendCollection()
    }

    setFriendBoxes(friendsCollectionArray)
  }, [friendsArray]);

  return (
    <div className="home">
      <div className="container">
        <h1>Friend Activity</h1>
        <div className="friendCollection">
          {friendBoxes &&
            friendBoxes.map((collection) => (
              <FriendBox key={collection._id} collection={collection} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
